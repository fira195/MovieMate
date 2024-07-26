import MovieCard from "./MvieCard";

function MovieHolder({ movies, title }) {
  return (
    <div className="w-full ">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="bg-main border-2 border-black p-4 pl-6 w-full flex no-scrollbar gap-8 overflow-x-scroll">
        {movies &&
          movies.map((item, indx) => {
            return <MovieCard id={indx}/>;
          })}
      </div>
    </div>
  );
}
export default MovieHolder;
