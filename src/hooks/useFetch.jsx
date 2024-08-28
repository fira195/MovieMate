import { useState } from "react";
import { toast } from "sonner";

function useFetchData(url) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      'Content-Type': 'application/json'   },
  };
  const fetchData = () => {
      setLoading(true);
      fetch(url, options)
        .then((res) => {
          if (!res.ok) throw Error("Couldn't Fetch Data...");
          return res.json();
        })
        .then((res) => {
          setResponse(res.data);
          console.log(response)
          setLoading(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setErr(e.message);
          console.log(e);
          setLoading(false);
        });
      }
  return { loading, err, response, fetchData };
}
export default useFetchData;
