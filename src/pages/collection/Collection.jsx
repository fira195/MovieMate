import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import PlaylistBody from "../../components/CollectionPlaylists";
import Lists from "./Lists";




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
