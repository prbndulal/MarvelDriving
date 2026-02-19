import { useState, useEffect } from 'react';

// Mock user type
interface User {
    id: string;
    name: string;
    email: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth state
        const timer = setTimeout(() => {
            // For now, we simulate no user logged in. 
            // Change to setUser({ id: '1', ... }) to test logged in state
            setUser(null);
            setIsAdmin(false);
            isLoading: false;
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const signIn = async () => {
        setIsLoading(true);
        // Simulate sign in
        setTimeout(() => {
            setUser({ id: '1', name: 'Test User', email: 'test@example.com' });
            setIsLoading(false);
        }, 1000);
    };

    const signOut = async () => {
        setIsLoading(true);
        // Simulate sign out
        setTimeout(() => {
            setUser(null);
            setIsAdmin(false);
            setIsLoading(false);
        }, 500);
    };

    return {
        user,
        isAdmin,
        isLoading,
        signIn,
        signOut
    };
}
