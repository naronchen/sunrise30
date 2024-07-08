import { useState, useEffect } from "react";
import supabase from "@/components/supabase";
import useAuthStatus  from "@/hooks/useAuthStatus";

export const useFetchData = (table: string = 'data', column: string = '*') => {
    const user = useAuthStatus();
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user?.id]);

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from(table)
            .select(column)
            .eq('user_id', user?.id);

        if (error) {
            setError(error);
        } else {
            setData(data);
        }
        setLoading(false);
    };

    return { data, error, loading };
}
