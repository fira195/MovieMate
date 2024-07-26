import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function SmallMovieCard({ name, year, imbd, id, rotten_tomatoes }) {
  const navigate = useNavigate();
  const [playlistView, setPlaylistView] = useState(false);

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
  const actionBtns = (e) => {
    e.stopPropagation();
    toast.success(e.target.getAttribute("name"));
  };
  const viewPlaylists = (e) => {
    e.stopPropagation();
    setPlaylistView((prev) => !prev);
  };
  const addToPlaylist = (e) => {
    e.stopPropagation();
    //request to the API to add movie to playlist
    toast.success(`${id} Added to ${e.target.textContent}`)
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:scale-[101%] transition-all duration-500 flex gap-4 items-center text-sm border-2 border-black p-2 relative mx-20"
    >
      <div className="w-20 h-20 bg-gray-600 flex-shrink-0"></div>
      <div className=" gap-4 items-center">
        <h1 className="font-semibold mb-2 text-lg">
          {name} <span className="opacity-90 font-normal">({year})</span>
        </h1>
        <p>IMBD: {imbd}</p>
        <p>Rotten Tomatoes: {rotten_tomatoes}</p>
      </div>
      <div className="flex gap-4 right-10 absolute">
        <div
          onClick={(e) => actionBtns(e)}
          name="Liked"
          className="w-8 h-8 bg-accent hover:-rotate-12 active:scale-90 rounded-lg transition-all duration-300"
        ></div>
        <div
          onClick={(e) => actionBtns(e)}
          name="Added to Watchlist"
          className="w-8 h-8 border-2 border-black hover:-rotate-12 active:scale-90 rounded-lg transition-all duration-300"
        ></div>
        <div
          onClick={(e) => viewPlaylists(e)}
          name="Added to Playlist"
          className="w-8 h-8 border-2 border-black hover:-rotate-12 active:scale-90 rounded-lg transition-all duration-300"
        ></div>
      </div>
      {playlistView && (
        <div className="bg-yellow-500 max-w-prose p-4 gap-2 flex flex-wrap">
          {playlist.map((item) => (
            <div onClick={addToPlaylist} className="bg-yellow-300 hover:bg-yellow-600 transition-all duration-200 p-2 px-4 font-semibold">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SmallMovieCard;
