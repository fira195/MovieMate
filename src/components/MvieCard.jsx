import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../pages/helper";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [imageStatus, setImageStatus] = useState('loading');

  const handleImageLoad = () => {
    setImageStatus('loaded');
  };

  const handleImageError = () => {
    setImageStatus('error');
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative w-60 cursor-pointer flex-shrink-0 border-accent border-2 p-2 pb-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group"
    >
      <div className="w-full bg-accent mb-2 h-[330px] flex items-center justify-center">
      {imageStatus === 'loading' && (
          <div className="absolute">
            <Loading />
          </div>
        )}
        {imageStatus === 'error' && (
          <div className="text-white text-center absolute">
            <p>Image not available</p>
          </div>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover ${
            imageStatus === 'loaded' ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        />
      </div>
      <p className="ml-2">
        {movie.title} <span>({movie.release_date.slice(0, 4)})</span>
      </p>
    </div>
  );
}

export default MovieCard;
