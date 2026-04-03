"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

// Fallback useAuth for backward compatibility if needed, 
// though it's better to use useSession() directly.
export function useAuth() {
    return {}; 
}
