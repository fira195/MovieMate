function MovieCard(){
    return (
          <div className="relative h-80 w-60 cursor-pointer flex-shrink-0  border-gray-400 border-4 p-2 pb-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group">
            <div className="h-[94%] w-full bg-slate-600 mb-2"></div>
            <p className="ml-2  group-hover:opacity-100 transition-opacity duration-200">
              asdf
            </p>
            <div className="absolute top-12 left-8 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p>IMBD: 7.8</p>
              <p>Rotten Tomatoes: 7.8</p>
            </div>
            <div className="absolute bottom-16 left-16 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-red-500 w-5 h-5 hover:scale-105"></div>
              <div className="bg-red-500 w-5 h-5 hover:scale-105"></div>
              <div className="bg-red-500 w-5 h-5 hover:scale-105"></div>
            </div>
          </div>
    )
  }
  export default MovieCard