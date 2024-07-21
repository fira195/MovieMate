import MovieCard from "./MvieCard";

    function MovieHolder({ movies, title }) {
        return (
        <div className="w-full ">
            <div className="flex gap-4 items-center font-semibold mb-6">
            <div className="bg-red-500 h-10 w-2 ml-2"></div>
            <h1 className="text-yellow-50 text-xl">{title}</h1>
            </div>
            <div className="bg-yellow-50 p-4 pl-6 w-full flex no-scrollbar gap-8 overflow-x-scroll">
            {movies && movies.map((item) => {
                return (
                    <MovieCard/>
                );
            })}
            </div>
        </div>
        );
    }


    /* <div className="relative h-full w-60 cursor-pointer flex-shrink-0  border-gray-400 border-4 p-2 pb-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group">
                    <div className="h-[90%] w-full bg-slate-600 mb-2"></div>
                    <p className="ml-2  group-hover:opacity-100 transition-opacity duration-200">{item}</p>
    
                    <div className="absolute top-12 left-8 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p>IMBD: 7.8</p>
                    <p>Rotten Tomatoes: 7.8</p>
                    </div>
                    <div className="absolute bottom-16 left-16 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-red-500 w-5 h-5 hover:scale-105"></div>
                    <div className="bg-red-500 w-5 h-5 hover:scale-105"></div>
                    <div className="bg-red-500 w-5 h-5 hover:scale-105"></div>
                    </div>
                </div> */
    export default MovieHolder;
    