import { useState, useCallback } from "react";
import { toast } from "sonner";
import useRefreshToken from "./useRefreshToken";

function useFetchData(initialUrl, initialMethod, initialBody) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const {refreshToken} = useRefreshToken();

  const fetchData = useCallback(async (url, method, body) => {
    let tokenRefreshAttempted = false;   
    const abortController = new AbortController();

    const performFetch = async () => {
      const token = localStorage.getItem("accessToken");
      const options = {
        method,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: body ? JSON.stringify(body) : undefined,
        signal: abortController.signal,
      };

      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, options);
        if (!res.ok) {
          if (res.status === 401 && !tokenRefreshAttempted) {
            // Try refreshing the token only once
            tokenRefreshAttempted = true;
            const success = await refreshToken();
            if (success===true) {
              return performFetch();  
            } else {
              throw new Error(res.statusText);
            }
          } else {
            throw new Error(res.statusText);
          }
        }

        const data = await res.json();
        setResponse(data.data);  
        return { data: data?.data, cleanup: () => abortController.abort() };   
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error(error.message );
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const result = await performFetch(); // Start fetch
    return result;  
  }, []);

  return { loading, error, response, fetchData };
}

export default useFetchData;
