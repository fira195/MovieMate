import { useCallback, useState } from "react";
import { api } from "../utils/api";
import { toast } from "sonner";
function useFetchData() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (method, url, body) => {
    const abortController = new AbortController();
    setLoading(true);
    try {
      let res = null;
      if (method === "GET")
        res = await api.get(url, { signal: abortController.signal });
      if (method === "POST")
        res = await api.post(url, body, { signal: abortController.signal });
      if (method === "PUT")
        res = await api.put(url, body, { signal: abortController.signal });
      if (method === 'DELETE')
        res = await api.delete(url, {data:body, signal: abortController.signal });
      console.log(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.status !== 403) {
        const errorMessage =
          err.response?.data?.data?.message || "Something went wrong";
        toast.error(errorMessage);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, error, fetchData };
}
export default useFetchData;
