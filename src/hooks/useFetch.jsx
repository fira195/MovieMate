import { useState } from "react";
import { toast } from "sonner";

function useFetchData(url) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [movies, setMovies] = useState(null);
  const [resultPageNumber, setResultPageNumber] = useState(0);
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
          setMovies(res.results);
          if (res.total_pages) setResultPageNumber(res.total_pages);
          setLoading(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setErr(e.message);
          console.log(e);
          setLoading(false);
        });
      }
  return { loading, err, movies, resultPageNumber, fetchData };
}
export default useFetchData;
