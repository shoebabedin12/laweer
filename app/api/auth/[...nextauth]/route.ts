import NextAuth, { NextAuthOptions, User as NextAuthUser, Session, JWT } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

// কাস্টম ইউজার ইন্টারফেস
interface CustomUser extends NextAuthUser {
  id: string;
  token: string;
  role?: string;
}

// কাস্টম সেশন ইন্টারফেস
interface CustomSession extends Session {
  user?: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    role?: string;
  };
  accessToken?: string;
}

// কাস্টম JWT ইন্টারফেস
interface CustomJWT extends JWT {
  id?: string;
  email?: string | null;
  accessToken?: string;
  role?: string;
}

// axios রেসপন্স টাইপ
interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const { token, user } = response.data;

          if (user) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              token,
              role: user.role,
            } as CustomUser;
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) {
            throw new Error('NEXT_PUBLIC_API_URL is not defined');
          }
          const response = await axios.post<AuthResponse>(
            `${apiUrl}/auth/google`,
            {
              email: profile.email,
              name: profile.name,
              googleId: profile.sub,
            }
          );

          const { token, user: backendUser } = response.data;

          user.id = backendUser.id.toString();
          user.name = backendUser.name;
          user.email = backendUser.email;
          user.token = token;
          user.role = backendUser.role;

          return true;
        } catch (error) {
          console.error('Google auth error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: CustomJWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
      if (session.user) {
        session.user.id = token.id || '';
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };