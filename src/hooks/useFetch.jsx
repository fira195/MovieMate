import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

function useFetchData(initialUrl, initialMethod, initialBody) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = useCallback((url, method, body) => {
    const abortController = new AbortController();
    const token=localStorage.getItem('accessToken')
    const options = {
      method,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`  
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
        setResponse(res.data);
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

 
  return { loading, error, response, fetchData };
}

export default useFetchData;