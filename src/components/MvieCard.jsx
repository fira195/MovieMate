import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function MovieCard({id}){
  const navigate=useNavigate()
  const actions=(e)=>{
    e.stopPropagation()
    toast.success('some action')
  }
    return (
          <div onClick={()=>navigate(`/movie/${id}`)} className="relative h-80 w-60 cursor-pointer flex-shrink-0 border-black border-2 p-2 pb-6 hover:scale-105 transition-all duration-500 hover:shadow-xl group">
            <div className="h-[94%] w-full bg-slate-600 mb-2"></div>
            <p className="ml-2  group-hover:opacity-100 transition-opacity duration-200">
              asdf
            </p>
            <div className="absolute top-12 left-8 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p>IMBD: 7.8</p>
              <p>Rotten Tomatoes: 7.8</p>
            </div>
            <div className="absolute bottom-16 left-16 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div onClick={(e)=>actions(e)} className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md bg-gray-500 w-7 h-7 hover:scale-105"></div>
              <div onClick={(e)=>actions(e)} className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md bg-red-500 w-7 h-7 hover:scale-105"></div>
              <div onClick={(e)=>actions(e)} className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md bg-gray-500 w-7 h-7 hover:scale-105"></div>
            </div>
          </div>
    )
  }
  export default MovieCard