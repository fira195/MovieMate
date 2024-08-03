import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function MovieCard({ movie}){
  const navigate=useNavigate()
  const actions=(e)=>{
    e.stopPropagation()
    toast.success('some action')
  }

  console.log(movie.poster_path)
    return (
          <div onClick={()=>navigate(`/movie/${movie.id}`)} className="relative w-60 cursor-pointer flex-shrink-0 border-accent border-2 p-2 pb-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group">
            <div className=" w-full bg-slate-600 mb-2">
              <img src={`https://image.tmd  b.org/t/p/w500${movie.poster_path}`} alt="image" />
            </div>
            <p className="ml-2  group-hover:opacity-100 transition-opacity duration-200">
              {movie.title} <span>{movie.release_date}</span>
            </p>
          {/*   <div className="absolute top-12 left-8 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p>IMBD: {movie.node.ratingsSummary.aggregateRating}</p>
              <p>Rotten Tomatoes: 7.8</p>
            </div>
            <div className="absolute bottom-16 left-16 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div onClick={(e)=>actions(e)} className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md border-2 border-black w-7 h-7 hover:scale-105"></div>
              <div onClick={(e)=>actions(e)} className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md bg-accent w-7 h-7 hover:scale-105"></div>
              <div onClick={(e)=>actions(e)} className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md border-2 border-black w-7 h-7 hover:scale-105"></div>
            </div> */}
          </div>
    )
  }
  export default MovieCard