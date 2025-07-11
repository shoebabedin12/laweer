import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions, Session } from 'next-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type ExtendedToken = JWT & { uid?: string; role?: string };
type ExtendedSession = Session & {
  user: {
    uid?: string;
    role?: string;
  };
};


export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = result.user;

          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const role = userDoc.data()?.role || 'user';

          return {
            id: user.uid,
            email: user.email,
            role,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }: { token: ExtendedToken; user?: any }) {
      if (user) {
        token.role = user.role;
        token.uid = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: ExtendedSession; token: ExtendedToken }) {
      if (session.user) {
        session.user.uid = token.uid;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
};
