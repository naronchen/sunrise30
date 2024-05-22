import { useState, useEffect } from "react";
import supabase from "@/components/supabase";

export default function useAuthStatus() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const { data: sessionData, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Error fetching user:', error);
                return;
            }

            if (sessionData?.session) {
                setUser(sessionData.session.user);
            }
        }

        fetchUser();
    }, []); // Empty dependency array ensures this runs only once on mount

    return user;
}
