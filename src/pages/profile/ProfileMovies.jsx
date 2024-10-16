import { useSelector } from "react-redux";
import MovieHolder from "../../components/MovieHolder";

function ProfileMovies(){
    const user = useSelector((state) => state.user);
  
    return (
      <div className="flex flex-col gap-8 mt-8">
          <MovieHolder
            title={"My Reviews"}
            url={`/lists/watchlist/${user.username}/protected`}
          />
          <MovieHolder
            title={"Watchlist"}
            url={`/lists/watchlist/${user.username}/protected`}
          />
          <MovieHolder
            title={"Watched"}
            url={`/lists/watchedMovies/${user.username}/protected`}
          />
        </div>
    )
  }
  export default ProfileMovies