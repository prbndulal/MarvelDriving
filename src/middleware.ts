import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    // Secure /admin routes
    if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
        
        // Optionally check for admin role
        if ((req.auth?.user as any)?.role !== "admin") {
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }

    return NextResponse.next();
});

// Configure where the middleware should run
export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
