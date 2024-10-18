import MovieCard from "../../components/MovieCard";
import Skeleton from "./Skeleton";

function SimilarMovies({ similarMovies }) {
    return (
      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Similar</h1>
        </div>
        <div className="border-2 border-black flex flex-wrap gap-6 md:p-4 p-0 justify-evenly">
          {similarMovies ? (
            similarMovies?.results?.map((item, key) => (
              <MovieCard key={key} movie={item} />
            ))
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    );
  }
  export default SimilarMovies