import { useState, useCallback } from "react";
import { toast } from "sonner";
import useRefreshToken from "./useRefreshToken";

function useFetchData(initialUrl, initialMethod, initialBody) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const refreshToken = useRefreshToken();

  const fetchData = useCallback(async (url, method, body) => {
    let tokenRefreshAttempted = false;  // Reset token refresh flag per request
    const abortController = new AbortController();

    const performFetch = async () => {
      const token = localStorage.getItem("accessToken");
      const options = {
        method,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

            if (success) {
              return performFetch(); // Retry the request after refreshing the token
            } else {
              throw new Error("Failed to refresh token");
            }
          } else {
            throw new Error(res.statusText);
          }
        }

        const data = await res.json();
        setResponse(data.data); // Assuming the API response has 'data' property
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error(error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    performFetch();

    return () => abortController.abort(); // Clean up if the component unmounts
  }, []);

  return { loading, error, response, fetchData };
}

export default useFetchData;
