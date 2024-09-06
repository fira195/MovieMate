import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useFetchData from "../hooks/useFetch";
import Loading from "../pages/helper";

const actionsList = [
  { name: "watchlist", icon: "/watchlist.png" },
  { name: "watchedMovies", icon: "/seen.png" },
  { name: "likedMovies", icon: "/heart.png" },
  { name: "addToPlaylist", icon: "/add-list.png" },
];

const MovieAction = ({ movie }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { loading, error, fetchData } = useFetchData();
  const [showPlaylistView, setShowPlaylistView] = useState(false);

  const movieDetailForDB = {
    tmbdId: movie?.tmbdId,
    title: movie?.Title,
    posterPath: movie?.Poster,
    releaseDate: movie?.Released,
    ratings: {
      imbdRating: movie?.imbdRating,
      rottenTomatoes:
        movie?.Ratings?.find((rating) => rating.Source === "Rotten Tomatoes")
          ?.Value || null,
    },
  };

  const handleActionClick = useCallback(async (actionName) => {
    if (actionName === "addToPlaylist") {
      setShowPlaylistView((prev) => !prev);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toast.error("You must be logged in to perform this action.");
      return navigate("/login");
    }

    try {
      const response = await fetchData(
        `http://localhost:3000/api/lists/${actionName}/${user?.username}`,
        "POST",
        movieDetailForDB
      );
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Action failed:", error);
      toast.error("Action failed, please try again.");
    }
  }, [fetchData, movieDetailForDB, navigate, user?.username]);

  return (
    <div className="flex gap-4 duration-200">
      {actionsList.map((item) => (
        <button
          key={item.name}
          disabled={loading}
          onClick={() => handleActionClick(item.name)}
          className="hover:scale-110 active:scale-90 cursor-pointer transition duration-300 rounded-md w-7 h-7"
          aria-label={`Action ${item.name}`}
        >
          <img src={item.icon} alt={`${item.name} icon`} />
        </button>
      ))}
      {showPlaylistView && (
        <PlaylistListComponent
          username={user?.username}
          tmbdId={movie?.tmbdId}
          movie={movieDetailForDB}
          onClose={() => setShowPlaylistView(false)}
        />
      )}
    </div>
  );
};
 
const PlaylistListComponent = ({ username, tmbdId, movie, onClose }) => {
  const { response, error, fetchData, loading } = useFetchData();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchData(`http://localhost:3000/api/lists/playlist/${username}`, "GET");
  }, [fetchData, username]);

  useEffect(() => {
    if (response?.playlists) {
      setPlaylists(response.playlists);
    } else if (response?.message) {
      toast.success(response.message);
      onClose();  
    }
  }, [response, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const addToPlaylist = async (playlist) => {
    await fetchData(
      `${process.env.REACT_APP_API_URL}/api/lists/playlist/${username}/${playlist._id}/${tmbdId}`,
      "POST",
      movie
    );
  };

  return (
    <div className="absolute bg-main border-2 border-black p-2 top-0">
      {
      loading?<Loading/>:
      playlists.map((playlist) => (
        <div
          key={playlist._id}
          onClick={() => addToPlaylist(playlist)}
          className="hover:bg-accent hover:text-third cursor-pointer p-2"
        >
          {playlist.name}
        </div>
      ))}
    </div>
  );
};

 export default MovieAction;