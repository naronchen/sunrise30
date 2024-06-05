import { useState, useEffect } from 'react';
import supabase from '@/components/supabase'; // Ensure this path matches your Supabase client setup

export default function useAuthStatus() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Initially check if there is a current session and set the user
        checkSession();

        // Subscribe to auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
            }
        );

        // Cleanup subscription on component unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    async function checkSession() {
        const { data: session } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
    }

    return user;
}
