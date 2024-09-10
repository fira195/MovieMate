import { useEffect, useState } from "react";
import SmallMovieCard from "../components/SmallMovieCard";

import useFetchData from "../hooks/useFetch";
import { useSelector } from "react-redux";
import PlaylistBody from "../components/CollectionPlaylists";

//expand

function Skeleton() {
  return <div className="bg-gray-500 w-full h-20 skeleton-shimmer"></div>;
}
function Lists({ url, username, openTitle }) {
  const { response, err, loading, fetchData } = useFetchData();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      fetchMovieList();
    };
    fetchMovies(); // Call the async function
  }, [url]); // Dependencies should include response and fetchData

  useEffect(() => {
    if (response) {
      setMovies(response.results); // Set the movies after the response is ready
    }
  }, [fetchData]);
  const fetchMovieList = () => {
    try {
      fetchData(`http://localhost:3000/api/lists/${url}/${username}`, "get");
    } catch (error) {
      console.error(error);
    }
  };
  const renderMovies = () => {
    if (loading)
      return Array.from({ length: 5 }).map((item) => {
        return <Skeleton />;
      });
    else if (err)
      return (
        <div className="font-bold text-center text-xl">
          Coudn't Fetch Data Try Reloading the page
        </div>
      );
    else if (response?.results.length <= 0)
      return (
        <div className="font-bold text-center text-xl">No Movies Found</div>
      );
    else {
      return (
        response?.results.map((item, key) => (
          <SmallMovieCard
            key={key}
            {...item}
            url={url}
            username={username}
            updataList={fetchMovieList}
          />
        ))
      );
    }
  };
  return (
    <div>
      <div className="flex gap-4 items-center font-semibold my-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className=" text-xl">{`${openTitle}: ${response?.results?.length}`}</h1>
      </div>
      <div>
        <div className="flex flex-col gap-6 ">{renderMovies()}</div>
      </div>
    </div>
  );
}

function Collection() {
  const user = useSelector((state) => state.user);

  const tabs = [
    {
      tab: "Watchlist",
      title: `FILMS YOU WANT TO SEE`,
      url: "watchlist",
    },
    {
      tab: "Playlist",
      title: `YOU have TO SEE playlists`,
      url: "playlists",
    },
    {
      tab: "Liked",
      title: `FILMS YOU LIKED`,
      url: "likedMovies",
    },
    {
      tab: "Watched",
      title: `FILMS YOU WATCHED`,
      url: "watchedMovies",
    },
  ];

  const [active, setActive] = useState(0);

  function tabManager(index) {
    setActive(index);
  }

  return (
    <div className="min-h-screen sm:px-20 bg-main px-10">
      <div className="bg-gray-500 h-52 absolute inset-0 w-full z-0 flex items-center">
        <p className="font-bold text-2xl ml-16">My Collection</p>
      </div>
      <div className="relative overflow-scroll no-scrollbar z-20 md:text-base text-sm flex md:gap-8 text-center mx-auto md:w-fit pt-56">
        {tabs.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => tabManager(index)}
              className={`hover:bg-accent hover:text-thrid p-2 px-4 cursor-pointer font-semibold  border-accent ${
                active === index && "border-b-2"
              }`}
            >
              {item.tab}
            </div>
          );
        })}
      </div>

      {tabs[active].tab === "Playlist" ? (
        <PlaylistBody username={user.username} />
      ) : (
        <Lists
          url={tabs[active].url}
          openTitle={tabs[active].title}
          username={user.username}
        />
      )}
    </div>
  );
}

export default Collection;
