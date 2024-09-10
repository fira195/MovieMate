import { useEffect, useRef } from "react";
import MvieCard from "./MovieCard";
import Loading, { Scroller } from "./helper";
import useFetchData from "../hooks/useFetch";
import { btnClassName } from "../utils/css";

function MovieHolder({ title, url }) {
  const { response, loading, error, fetchData } = useFetchData();  
  const containerRef = useRef();

  useEffect(() => {
    fetchData(url, 'GET');
  }, [url]);

  const renderMovies = () => {
    if (loading) {
      return <div className="size-10 m-auto"><Loading /></div>;
    }

    if (error) {
      return (
        <div className="m-auto text-center space-y-4">
          <p>Couldn't Fetch Data</p>
          <button className={btnClassName} onClick={fetchData}>
            Retry
          </button>
        </div>
      );
    }

    if (response?.results?.length > 0) {
      return response.results.map((movie, index) => (
        <MvieCard key={movie.id} movie={movie} />
      ));
    }

    return <div>No movies found.</div>;
  };

  return (
    <div className="w-full relative p-4">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div
        ref={containerRef}
        className="shadow-xl py-4 w-full flex no-scrollbar gap-8 overflow-x-scroll"
      >
        {response?.results && <Scroller containerRef={containerRef} />}
        {renderMovies()}
      </div>
    </div>
  );
}

export default MovieHolder;
