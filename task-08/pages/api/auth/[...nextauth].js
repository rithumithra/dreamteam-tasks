import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

    
        const user = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }).then((res) => res.json());

        if (user && user.isValid) {
          return user; 
        }

        return null; 
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/signin", 
  },
  secret: process.env.NEXTAUTH_SECRET,
});
