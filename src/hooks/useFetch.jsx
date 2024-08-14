import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function useFetchData(link, search, currentPage) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [movies, setMovies] = useState(null);
  const [resultPageNumber, setResultPageNumber] = useState(0);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMzU2NTA5Ni4yMjQyNDMsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pEot7qb10waifXmVrOmyYjKllx7o4h52tcjtWredgzs",
    },
  };
  const fetchData = useCallback(() => {
      setLoading(true);
      fetch(link, options)
        .then((res) => {
          if (!res.ok) throw Error("Couldn't Fetch Data...");
          return res.json();
        })
        .then((res) => {
          setMovies(res.results);
          setResultPageNumber(res.total_pages);
          setLoading(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setErr(e.message);
          console.log(e);
          setLoading(false);
        });
    }, [search, currentPage])

  return { loading, err, movies, resultPageNumber, fetchData };
}
export default useFetchData;
