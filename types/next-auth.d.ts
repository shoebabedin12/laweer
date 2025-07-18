
declare module "next-auth" {
  interface User {
    uid: string;
    role: string;
  }

  interface Session {
    user: {
      uid: string;
      role: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    uid: string;
    role: string;
  }
}
