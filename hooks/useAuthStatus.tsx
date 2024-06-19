import { useState, useEffect } from 'react';
import supabase from '@/components/supabase'; // Ensure this path matches your Supabase client setup
import { User } from '@supabase/supabase-js';

export default function useAuthStatus(): User | null {
    const [user, setUser] = useState<User | null>(null);

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
        const { data, error } = await supabase.auth.getSession();
    
        if (error) {
            console.error('Error getting session:', error);
            setUser(null);
        } else {
            setUser(data?.session?.user ?? null);
        }
    }
    

    return user;
}
