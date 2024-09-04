import { useNavigate } from "react-router-dom";
import PosterImage from "./PosterImage";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <>
      {movie && (
        <div
          onClick={() => navigate(`/movie/${movie.id? movie.id : movie.tmbdId}`)}
          className="relative w-60 cursor-pointer flex-shrink-0 border-accent border-2 p-2 pb-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group"
        >
          <div className="w-full bg-accent mb-2 h-[330px] flex items-center justify-center">
            <PosterImage
              width={'w-[350px]'}
              src={movie.posterPath || `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <p className="ml-2">
            {movie.title} <span>({ movie.releaseDate? movie.releaseDate.slice(0, 4): movie.release_date.slice(0, 4)})</span>
          </p>
        </div>
      )}
    </>
  );
}

export default MovieCard;
