import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Your logic for verifying user
        if (credentials?.email === "test@test.com" && credentials.password === "123456") {
          return { id: "1", name: "Test User", email: "test@test.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login", // optional custom page
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
