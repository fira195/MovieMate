import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import Loading, { Scroller } from "./helper";
import useFetchData from "../hooks/useFetch";
import { btnClassName } from "../utils/css";

function MovieHolder({ title, url }) {
  const { loading, error, fetchData } = useFetchData();
  const [response, setResponse] = useState([]); // State for API response
  const containerRef = useRef(); // Ref for scrollable container

  // Fetch data on component mount or URL change
  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const fetchDataAsync = async () => {
      const data = await fetchData(url, "GET"); // Fetch data using custom hook
      if (isMounted && data?.data) {
        setResponse(data.data); // Set API response if component is still mounted
      }
    };

    fetchDataAsync();

    return () => {
      isMounted = false; // Prevent state updates after unmount
    };
  }, [url, fetchData]);

  // Render the movie cards based on API response
  const renderMovies = () => {
    if (loading) {
      return (
        <div className="size-10 m-auto">
          <Loading /> {/* Show loading spinner */}
        </div>
      );
    }

    if (error) {
      return (
        <div className="m-auto text-center space-y-4">
          <p>Couldn't Fetch Data</p>
          <button
            className={btnClassName}
            onClick={() => fetchData(url, "GET")}
          >
            Retry {/* Retry button on error */}
          </button>
        </div>
      );
    }

    if (response?.results?.length > 0) {
      return response.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} /> // Render movie cards
      ));
    }

    return <div>No movies found.</div>; // Show if no movies are returned
  };

  return (
    <div className="w-full relative p-4">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">{title}</h1> {/* Section title */}
      </div>
      <div
        ref={containerRef}
        className="shadow-xl py-4 w-full flex no-scrollbar gap-8 overflow-x-scroll"
      >
        {response?.results && <Scroller containerRef={containerRef} />} {/* Scroll indicator */}
        {renderMovies()} {/* Render movie cards */}
      </div>
    </div>
  );
}

export default MovieHolder;
