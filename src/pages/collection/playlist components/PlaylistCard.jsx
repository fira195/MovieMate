import { useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useFetch2.0";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import Loading, { Scroller } from "../../../components/helper";
import EditCard from "./EditCard";

function PlaylistCard({
    playlist,
    expand,
    expandHandler,
    cardView,
    cardViewHandler,
    fetchPlaylists,
  }) {
    const { fetchData, loading } = useFetchData();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    //remove movie from the playlist using its id
    const removeMovie = async(e, movieId) => {
      e.stopPropagation();
      const response= await fetchData(
        'DELETE',
        `/lists/playlist/${user.username}/${playlist._id}/${movieId}`,
      );
      if (response?.data) toast.success(response.data.message)
      //dont know this one yet
        fetchPlaylists()
    };


  
    const [imageError, setImageError] = useState(false);
    const ref=useRef()

    return (
      <div
        onClick={(e) => {
          if (e.target.classList.contains("expand")) expandHandler(playlist._id);
        }}
        className={`expand relative border-2 border-black p-6 py-10 cursor-pointer  transition-transform ease-in-out w-full  ${
          expand === playlist._id ? "h-96 mb-44" : "h-40"
        }`}
        style={{ transition: "height 0.2s ease-in-out" }}
      >
        <div className="expand gap-4 items-center">
          <h1 className="expand font-semibold mb-2 text-xl">{playlist?.name}</h1>
          <div className="expand leading-5 mb-4 text-sm">
            <p className="expand">
              <span className="expand font-semibold">Movies:</span>{" "}
              {playlist?.movies?.length ? playlist?.movies?.length : 0}
            </p>
            <p className="expand">
              <span className="expand font-semibold">Description:</span>{" "}
              {playlist?.description}
            </p>
          </div>
        </div>
        {expand === playlist._id && (
          <div className="flex justify-end align-top my-4">
            <button
              onClick={cardViewHandler}
              className={`rounded-lg z-20 hover:scale-105 transition-all duration-200 text-thrid font-bold px-4 p-2 bg-accent`}
            >
              Edit
            </button>
          </div>
        )}
        <div className="relative">
        <div
        ref={ref}
          className={`expand  flex gap-4 overflow-y-hidden overflow-x-scroll no-scrollbar transition-all duration-500 ease-in-out`}
        >
          {expand === playlist._id &&
            playlist?.movies?.map((movie, indx) => (
              <div
                key={movie.movieId}
                onClick={() => navigate(`/movie/${movie.movieId}`)}
                className=" lg:w-60 w-44 relative flex-shrink-0 hover:scale-[101%] transition-all duration-200 group"
              >
                <div
                  onClick={(e) => removeMovie(e, movie.movieId)}
                  className="w-8 h-8 left-1/2 bottom-4 -translate-x-1/2 absolute opacity-0 transition-all duration-300 bg-main p-2 rounded-[50%] group-hover:opacity-100 hover:-rotate-90 active:scale-90"
                >
                  {loading? <Loading/> :<img src="delete.png" alt="" />}
                </div>
                {(!movie.posterPath && !imageError) ? (
                  <div className=" h-full w-full bg-accent flex items-center justify-center text-thrid font-medium">Couldn't Load Image </div>
                ) : (
                  <img
                    src={movie.posterPath}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            ))}
        {playlist?.movies && expand === playlist._id && <Scroller containerRef={ref}/>}
        </div>
  
        </div>
  
        {expand === playlist._id && cardView && (
          <EditCard
            fetchPlaylists={fetchPlaylists}
            cardViewHandler={cardViewHandler}
            playlist={playlist}
          />
        )}
      </div>
    );
  }
  export default PlaylistCard