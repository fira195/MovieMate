import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

function useFetchData(initialUrl, initialMethod, initialBody) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback((url, method, body) => {
    const abortController = new AbortController();
    const options = {
      method,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: abortController.signal
    };

    setLoading(true);
    setError(null);

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((res) => {
        setData(res.data || res);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') return;
        toast.error(e.message);
        setError(e.message);
        console.error(e);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (initialUrl) {
      fetchData(initialUrl, initialMethod, initialBody);
    }
  }, [initialUrl, initialMethod, initialBody, fetchData]);

  return { loading, error, data, fetchData };
}

export default useFetchData;