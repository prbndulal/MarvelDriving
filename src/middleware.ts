import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // Correct matcher to ignore heavy files and focus on protected routes
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
