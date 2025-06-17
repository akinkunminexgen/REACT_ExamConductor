import { useState, useEffect } from "react";

const useFetch = (url, payload) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url || !payload) return;

        let isMounted = true; 
        setLoading(true);
        setError(null);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setData(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false; // cleanup
        };
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
