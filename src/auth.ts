import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const result = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (user && user.password) {
                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);
                    
                    // Fallback for plain text until next login
                    if (!isPasswordValid && user.password === credentials.password) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        };
                    }

                    if (isPasswordValid) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        };
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export const { handlers, auth, signIn, signOut } = result;
