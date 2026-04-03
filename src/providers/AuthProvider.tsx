"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin Email List
const ADMIN_EMAILS = [
    "admin@example.com",
    "admin@marvel.com",
    "dev@marvel.com",
    "test-admin@marvel.com",
    "admin@marveldriving.com.au"
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        // Implementation check for admin
        const checkIsAdmin = (email: string | undefined) => {
            if (!email) return false;
            return ADMIN_EMAILS.includes(email.toLowerCase());
        };

        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            // Check for Local Testing Bypass (via URL or SessionStorage)
            const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
            const hasUrlBypass = urlParams?.get('admin_bypass') === 'true';
            const bypassEmailInStorage = typeof window !== 'undefined' ? sessionStorage.getItem('admin_bypass_email') : null;
            const bypassEmail = hasUrlBypass ? 'test-admin@marvel.com' : bypassEmailInStorage;
            
            if (hasUrlBypass && typeof window !== 'undefined') {
                sessionStorage.setItem('admin_bypass_email', 'test-admin@marvel.com');
            }

            if (bypassEmail && !session) {
                // Mock a user for local testing
                const mockUser = { id: 'mock-id', email: bypassEmail } as User;
                setUser(mockUser);
                setIsAdmin(true);
            } else {
                setSession(session);
                setUser(session?.user ?? null);
                setIsAdmin(checkIsAdmin(session?.user?.email));
            }
            
            setIsLoading(false);
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setIsAdmin(checkIsAdmin(session?.user?.email));
                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, [supabase]);

    const signOut = async () => {
        if (typeof window !== 'undefined') sessionStorage.removeItem('admin_bypass_email');
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, session, isLoading, isAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

