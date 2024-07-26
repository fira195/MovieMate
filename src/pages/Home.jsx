import { useNavigate } from "react-router-dom";
import MovieHolder from "../components/MovieHolder";

function Home() {
  const movies = [
    "Avatar (2003)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-main h-auto p-6">
      <div className=" w-full h-[40rem] flex gap-40 pr-0 pb-20 p-40 font-semibold">
        <div className=" mt-20">
          <h1 className="font-bold text-4xl text-black mb-10">
            Welcome Back, [User]
          </h1>
          <input
            className="w-full px-4 p-3 bg-thrid border-2 border-black outline-none mb-4"
            placeholder="Search Movie"
            type="text"
          />
          <div>
            <button
              onClick={(e) => navigate(`/search/${e.target.value}`)}
              className="transition duration-300 hover:scale-105 active:scale-95 bg-accent border-2 border-accent text-thrid p-2 px-4 rounded-lg  ml-2 mr-6"
            >
              Search
            </button>
            <button
              onClick={(e) => navigate(`/discover`)}
              className="transition duration-300 hover:scale-105 active:scale-95 bg-main border-2 border-black text-black p-2 px-4 rounded-lg"
            >
              Discover
            </button>
          </div>
        </div>
        <div className="h-full border-2 border-black w-1/2"></div>
      </div>
      <div className="gap-12 flex flex-col">
        <MovieHolder title={"Trending Movies"} movies={movies} />
        <MovieHolder title={"Top Rated"} movies={movies} />
        <MovieHolder title={"Liked Movies"} movies={movies} />
      </div>
    </div>
  );
}

export default Home;
