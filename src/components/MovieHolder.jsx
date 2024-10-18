import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import Loading, { Scroller } from "./helper";
import useFetchData from "../hooks/useFetch2.0";
import { btnClassName } from "../utils/css";
import { Link } from "react-router-dom";

function MovieHolder({ title, url }) {
  const { loading, error, fetchData } = useFetchData();
  const [response, setResponse] = useState([]);  
  const containerRef = useRef(); 

   useEffect(() => {
    let isMounted = true;  

    const fetchDataAsync = async () => {
      const data = await fetchData('GET', url);  
      if (isMounted && data?.data) {
        setResponse(data.data);  
      }
    };

    fetchDataAsync();

    return () => {
      isMounted = false;  
    };
  }, [url, fetchData]);

   const renderMovies = () => {
    if (loading) {
      return (
        <div className="size-10 m-auto">
          <Loading /> 
        </div>
      );
    }

    if (error) {
      return (
        <div className="m-auto text-center space-y-4">
          <p>Couldn't Fetch Data</p>
          <button
            className={btnClassName}
            onClick={() => fetchData( "GET", url)}
          >
            Retry  
          </button>
        </div>
      );
    }

    if (response?.results?.length > 0) {
      return response.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />  
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
        {response?.results && <Scroller containerRef={containerRef} />} {/* Scroll indicator */}
        {renderMovies()}  
      </div>
    </div>
  );
}

export default MovieHolder;
