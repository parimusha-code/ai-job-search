import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Demo Account",
            credentials: {},
            async authorize() {
                return { id: "1", name: "Demo User", email: "demo@google.com" };
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "test-secret-key",
});

export { handler as GET, handler as POST };
