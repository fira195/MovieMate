import { useEffect, useState } from "react";
import MvieCard from "../components/MvieCard";

function Loading() {
  return <div>Loading...</div>;
}

function MovieHolder({ title, url, options }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        console.log(res.results);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false)); 
  }, [url, options]); 

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="shadow-xl p-4 pl-6 w-full flex no-scrollbar gap-8 overflow-x-scroll">
        {loading && movies? (
          <Loading />
        ) : movies.length > 0 ? (
          movies.map((item,indx) => (
            <MvieCard key={indx} movie={item} />
          ))
        ) : (
          <div>No movies found.</div>
        )}
      </div>
    </div>
  );
}

export default MovieHolder;
