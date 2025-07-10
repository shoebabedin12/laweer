import { signIn } from '@/lib/auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login', // Custom login page
  },
  providers: [
    import('next-auth/providers/credentials').then(({ default: Credentials }) => Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await signIn(credentials.email as string, credentials.password as string);
          if (user) {
            return { id: user.uid, email: user.email, role: user.role };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    })),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role; // Add role to session
      }
      return session;
    },
  },
};