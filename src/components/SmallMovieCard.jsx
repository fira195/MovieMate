import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from '../pages/helper'
import useFetchData from "../hooks/useFetch";

function SmallMovieCard({ title, releaseDate, id, ratings, posterPath }) {
  const {response,err, loading,fetchData}=useFetchData()
  const navigate = useNavigate();
  const [playlistView, setPlaylistView] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageHasError, setImageHasError] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setImageHasError(true);
    setIsImageLoading(false);
  };

  //playlist where the movie is not part of fetched
  const [playlist, setPlaylist] = useState([
    {
      name: "[playlist 1",
    },
    {
      name: "playlist 2",
    },
    {
      name: "Lovedddd",
    },
    {
      name: "Lovedddd",
    },
    {
      name: "Lovedddd",
    },
  ]);

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };
;
  const handleRemoveFromList = async(e) => {
    e.stopPropagation();
    await fetchData('http://localhost:3000/api/lists/watchlist/l', 'DELETE', {movieId: id})     
    if (response) {toast.success(`${id} Removed from watchlist`)
    navigate('/collection')};
  };
  return (
    <div
      onClick={handleClick}
      className="flex-col sm:flex-row cursor-pointer hover:scale-[101%] transition-all duration-500 flex gap-4 items-center text-sm border-2 border-black p-2 relative mx-20"
    >
      <div className="w-20 flex-shrink-0">
        {isImageLoading && <Loading />}
        {imageHasError ? (
          <div className="w-20 bg-accent text-thrid text-center p-2">Error loading image</div>
        ) : (
          <img
            src={posterPath}
            alt="Movie Poster"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      <div className=" gap-4 items-center">
        <h1 className="font-semibold mb-2 md:text-lg">
          {title}{" "}
          <span className="opacity-90 font-normal">
            ({releaseDate?.slice(0, 4)})
          </span>
        </h1>
        <p className="md:text-base text-xs hidden sm:block">
          IMBD: {ratings?.imbdRating}
        </p>
        <p className="md:text-base text-xs hidden sm:block">
          Rotten Tomatoes: {ratings?.rottenTomatoes}
        </p>
      </div>
      <div className="hidden gap-4 right-10 absolute md:flex">
        <div
          onClick={handleRemoveFromList}
          name="Liked"
          className="w-8 h-8 bg-accent hover:-rotate-12 active:scale-90 rounded-lg transition-all duration-300"
        ></div> 
      </div>
      {playlistView && (
        <div className="bg-yellow-500 max-w-prose p-4 gap-2 flex flex-wrap">
          {playlist.map((item) => (
            <div
              onClick={addToPlaylist}
              className="bg-yellow-300 hover:bg-yellow-600 transition-all duration-200 p-2 px-4 font-semibold"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SmallMovieCard;
