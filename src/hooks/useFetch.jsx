import { useState } from "react";
import { toast } from "sonner";

function useFetchData(url, method, body) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = (url, method, body) => {
    const options = {
      method,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };
    setLoading(true);
    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setErr(e.message);
        console.log(e);
        setLoading(false);
      });
  };
  return { loading, err, response, fetchData };
}
export default useFetchData;
