import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFetchData from "../../hooks/useFetch2.0";
import BasicMovieInfo from "./BasicMovieInfo";
import Skeleton from "./Skeleton";
import Trailer from "./Trailer";
import Cast from "./Cast";
import Review from "./Review";
import SimilarMovies from "./SimilarMovies";

function Body({ movie, actions }) {
  const ref = useRef();
  return (
    <div className="space-y-10">
      <BasicMovieInfo movie={movie} reviewRef={ref} />

      {/* PLOT */}
      <div className="shadow-xl md:p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Plot</h1>
        </div>
        {movie?.Plot ? <p>{movie.Plot}</p> : <Skeleton />}
      </div>

      <Trailer youtubeUrl={movie?.youtubeUrl} />

      <Cast credits={movie?.credits} />

      <div ref={ref}>
        <Review />
      </div>

      <SimilarMovies similarMovies={movie?.similarMovies} />
    </div>
  );
}

function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const link = `/movies/movie/${id}`;
  const { loading, error, fetchData } = useFetchData();

  useEffect(() => {
    const asyncFetchMovie = async () => {
      const data = await fetchData("GET", link);
      setMovie(data.data);
    };
    asyncFetchMovie()
  }, [id, navigate]);

  return (
    <div className="bg-main pt-20 p-5 md:px-20">
      <Body key={movie?.imdb_id} movie={movie} />
    </div>
  );
}

export default Movie;
