import React from "react";
import { useSelector } from "react-redux";
import useFetchData from "../hooks/useFetch";
import { toast } from "sonner";
import Loading from "../pages/helper";
import { useNavigate } from "react-router-dom";

function MovieAction({ movie }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const { loading, response, fetchData } = useFetchData();

  const actions = async (name) => {
  const accessToken= localStorage.getItem('accessToken')

    if (!accessToken) {
      toast.error("You must be logged in to perform this action.");
      return navigate("/login");
    }
    try {
      const body = {
        tmbdId: movie.tmbdId,
        title: movie.Title,
        posterPath: movie.Poster,
        releaseDate: movie.Released,
        ratings: {
          imbdRating: movie.imbdRating,
          rottenTomatoes: movie?.Ratings?.find((rating) => rating.Source === "Rotten Tomatoes")?.Value || null,
        },
      };
      await fetchData(
        `http://localhost:3000/api/lists/${name}/${user.username}`,
        "POST",
        body
      );

      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Action failed:", error);
      toast.error("Action failed, please try again.");
    }
  };

  const actionsList = [
    {
      name: "watchlist",
      icon: "/watchlist.png",
    },
    {
      name: "watchedMovies",
      icon: "/seen.png",
    },
    {
      name: "likedMovies",
      icon: "/heart.png",
    },
  ];


  return (
    <div className="flex gap-4 duration-200">
      {actionsList.map((item) => (
        <button
          key={item.name}
          disabled={loading}
          onClick={() => actions(item.name)}
          className={`hover:-rotate-12 active:scale-90 cursor-pointer transition duration-300 rounded-md w-7 h-7 hover:scale-105`}
          aria-label={`Action ${item.name} `}
        >
           <img src={item.icon} alt={`${item.name} icon`} />
        </button>
      ))}
    </div>
  );
}

export default MovieAction;
