import { useEffect, useRef, useState } from "react";
import MvieCard from "../components/MvieCard";
import Loading, { Scroller } from "../pages/helper";
import useFetchData from "../hooks/useFetch";
import { btnClassName } from "../utils/css";

function MovieHolder({ title, url }) {
  const { movies, loading, err, fetchData } = useFetchData(url);

  useEffect(() => {
    fetchData();
  }, [url]);

  const renderMovie = () => {
    if (err) {
      return (
        <div className="m-auto text-center space-y-4">
          <p>Couldn't Fetch Data</p>
          <button className={btnClassName} onClick={fetchData}>
            Retry
          </button>
        </div>
      );
    } else if (loading) {
      return <Loading />;
    } else if (movies && movies.length > 0)
     return movies.map((item, indx) => <MvieCard key={indx} movie={item} />);
    else return <div>No movies found.</div>;
  };
  const ref = useRef();
  return (
    <div className="w-full relative p-4">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div
        ref={ref}
        className="shadow-xl py-4 w-full flex no-scrollbar gap-8 overflow-x-scroll"
      >
        {movies && <Scroller containerRef={ref} />}
        {renderMovie()}
      </div>
    </div>
  );
}

export default MovieHolder;
