declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      uid?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid?: string;
    role?: string;
  }
}