import { useEffect, useRef, useState } from "react";
import SmallMovieCard from "../components/SmallMovieCard";

function EditCard() {
  const Ref=useRef()
  const [isClicked,setIsClicked]=useState(0)
  const [Xcor,setXcor]=useState()
  useEffect(()=>{

    Ref.current.addEventListener('mousedown',()=>{
      setIsClicked(1)
      console.log(isClicked)
  })
    Ref.current.addEventListener('mouseup',()=>{
      setIsClicked(0)
      })  
    Ref.current.addEventListener('mousemove',()=>{
      if(isClicked) console.log(isClicked)
    })

  },[])
  return (
    <div
      ref={Ref}
      className={`border-4 border-red-700 bg-yellow-50 flex flex-col p py-10 p-4 gap-4 absolute top-${Xcor}`}
    >
      <input
        className="px-4 p-2 outline-none border-2 border-red-950"
        type="text"
        placeholder="Playlist Name"
      />
      <input
        className="px-4 p-2 outline-none border-2 border-red-950"
        type="text"
        placeholder="Playlist Details"
      />
      <div className="flex gap-4">
        <button className="rounded-lg px-4 p-2 bg-red-500">Edit</button>
        <button className="rounded-lg px-4 p-2 bg-yellow-50 border-2 border-black">
          Delete
        </button>
      </div>
    </div>
  );
}

function Body({ title, movies }) {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {Array.isArray(movies) &&
          movies.length > 0 &&
          movies.map((item, key) => <SmallMovieCard key={key} {...item} />)}
      </div>
    </div>
  );
}
//expand
function PlaylistCard({ playlist }) {
  const [ex, setEx] = useState(false);
  const [cardView,setCardView]=useState(false)

  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains('expand')) setEx((prev) => !prev)
      }}
      className={`expand relative bg-yellow-50 p-6 py-10 cursor-pointer hover:scale-[101%] transition-transform duration-800 ease-in-out ${
        ex ? "w-auto" : "w-[40%]"
      } max-w-[100%]`}
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="expand gap-4 items-center">
        <h1 className="expand font-semibold mb-2 text-xl">{playlist.playlist_name}</h1>
        <div className="expand leading-5 mb-4 text-sm">
          <p className="expand">
            <span className="expand font-semibold">Movies:</span>{" "}
            {playlist.movies.length ? playlist.movies.length : 0}
          </p>
          <p className="expand">
            <span className="expand font-semibold">Detail:</span>{" "}
            {playlist.detail && playlist.detail}
          </p>
        </div>
      </div>
      <div
        className={`expand flex gap-4 overflow-scroll no-scrollbar transition-all duration-500 ease-in-out ${
          ex ? "flex-wrap" : ""
        }`}
      >
        {playlist.movies &&
          playlist.movies.map((item, indx) => (
            <div
              key={indx}
              className="w-40 h-40 flex-shrink-0 bg-gray-700"
            ></div>
          ))}
      </div>
      {ex && <button onClick={()=>setCardView(prev=>!prev)} className={`rounded-lg hover:scale-105 transition-all duration-200 text-yellow-50 absolute font-bold ${playlist.movies<2?"right-10":"right-3"} top-10 px-4 p-2 bg-red-500 `}>Edit</button>}
      {(ex && cardView) && <EditCard/>}
    </div>
  );
}
function Body1({ playlist }) {
  return (
    <div className="mx-20 flex gap-10 flex-wrap">
      {playlist.map((item, key) => {
        return <PlaylistCard playlist={item} />;
      })}
    </div>
  );
}
function Collection() {
  //manages the highlight of the tab
  const [movies, setMovies] = useState([
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
  ]);
  const tabs = [
    {
      tab: "Watchlist",
      title: `YOU WANT TO SEE ${movies.length} FILMS`,
    },
    {
      tab: "My Playlist",
      title: `YOU have TO SEE ${movies.length} playlists`,
    },
    {
      tab: "Liked",
      title: `YOU like TO SEE ${movies.length} FILMS`,
    },
    {
      tab: "Watched",
      title: `YOU watched TO SEE ${movies.length} FILMS`,
    },
  ];
  const [active, setActive] = useState(0);
  function tabManager(index) {
    //fetch the movies
    if (tabs[index].tab == "Liked")
      setMovies((prev) => {
        return [prev[0]];
      });
    else setMovies([]);
    setActive(index);
  }

  const playlist = [
    {
      playlist_name: "plalist 2",
      detail: "sleppy lippy",
      movies: [
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },

        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
      ],
    },
    {
      playlist_name: "plalist 1",
      detail: "sleppy lippy",
      movies: [
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
      ]
    },
    {
      playlist_name: "plalist 1",
      detail: "sleppy lippy",
      movies: [
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
        {
          name: "Avatar",
          rotten_tomatoes: "9.8",
          imbd: "9.5",
          year: "2003",
        },
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-red-950 relative ">
      <div className="bg-gradient-to-b from-gray-500 to-gray-400 h-52 absolute w-full z-0 flex items-center">
        <p className="font-bold text-2xl ml-16">My Collection</p>
      </div>
      <div className="relative z-10 flex gap-8 text-center justify-center pt-56">
        {tabs.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => tabManager(index)}
              className={`hover:bg-red-900 p-2 px-4 cursor-pointer  font-semibold text-yellow-50 border-red-500 ${
                active === index && "border-b-2"
              }`}
            >
              {item.tab}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 items-center font-semibold my-6 m-4 ">
        <div className="bg-red-500 h-10 w-2 ml-2"></div>
        <h1 className="text-yellow-50 text-xl">{tabs[active].title}</h1>
      </div>
      {tabs[active].tab === "My Playlist" ? (
        <Body1 playlist={playlist} />
      ) : (
        <Body movies={movies} />
      )}
    </div>
  );
}

export default Collection;
