import MovieAction from "../../components/MovieActions";
import PosterImage from "../../components/PosterImage";
import Rating from "./Rating";
import Skeleton from "./Skeleton";

function BasicMovieInfo({ movie, reviewRef }) {

    const details = [
      `IMBD: ${movie?.imdbRating || "-"}`,
      `Genre: ${movie?.Genre || "-"}`,
      `Director: ${movie?.Director || "-"}`,
      `Release Date: ${movie?.Released || "-"}`,
      `Runtime: ${movie?.Runtime || "-"}`,
    ];
    const scrollToReview = () => {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
    };
  
    
    return (
      <div className="flex flex-col md:flex-row gap-10 border-2 border-accent relative items-center">
        {/* backGround */}
        {movie?.movie && (
          <div
            className="absolute inset-0 z-0 w-full h-full bg-cover bg-center blur-md"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.movie?.backdrop_path})`,
            }}
          ></div>
        )}
  
        {/* poster */}
        <div className="flex flex-col  z-10 gap-4 pb-4 items-center relative">
          <div className="absolute inset-0 bg-main bg-opacity-70 -z-10 h-full"></div>
          <PosterImage
            src={movie?.Poster}
            alt={movie?.Title}
            width={"w-[250px]"}
          />
            <MovieAction movie={movie}/>
        </div>
  
        {/* Details */}
        <div className="z-10 relative p-4 h-fit space-y-4">
          <div className="absolute inset-0 bg-main bg-opacity-70 -z-10 h-full"></div>
          {movie?.Title ? (
            <h1 className="font-bold text-xl my-6">
              {movie?.Title}{" "}
              <span className="text-accent">({movie?.Year && movie?.Year})</span>
            </h1>
          ) : (
            <Skeleton />
          )}
          <div>
            {details.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="flex flex-col md:flex-row  w-fit justify-center gap-4 md:items-center">
            <Rating />
            <button
              onClick={scrollToReview}
              className="bg-accent size-fit hover:scale-105 active:scale-90 transition duration-300 text-thrid p-2 px-3 rounded-xl"
            >
              Review
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default BasicMovieInfo