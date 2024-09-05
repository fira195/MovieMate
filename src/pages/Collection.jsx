import { useEffect, useState } from "react";
import SmallMovieCard from "../components/SmallMovieCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useDrag from "../hooks/useDrag";
import useFetchData from "../hooks/useFetch";


function EditCard({ playlist_name }) {
  const formik = useFormik({
    initialValues: {
      playlistName: "",
      playlistDetails: "",x 
    },
    validationSchema: Yup.object({
      playlistName: Yup.string().required("Playlist Name is required"),
      playlistDetails: Yup.string().required("Playlist Details are required"),
    }),
    onSubmit: (values) => {
      toast.success("Playlist Updated");
      console.log("Form values:", values);
    },
  });
  return (
    <div className="border-2 top-0  border-black z-30 absolute bg-main flex flex-col p py-10 p-4 gap-4 mt-6 w-fit">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            className={`rounded-lg px-4 p-2 outline-none border-2 `}
            type="text"
            placeholder="Playlist Name"
            name="playlistName"
            value={formik.values.playlistName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.playlistName && formik.errors.playlistName ? (
            <div className="text-black">{formik.errors.playlistName}</div>
          ) : null}

          <input
            className={`rounded-lg px-4 p-2 outline-none border-2 `}
            type="text"
            placeholder="Playlist Details"
            name="playlistDetails"
            value={formik.values.playlistDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.playlistDetails && formik.errors.playlistDetails ? (
            <div className="text-black">{formik.errors.playlistDetails}</div>
          ) : null}

          <div className="flex gap-4 font-semibold">
            <button
              type="submit"
              className="rounded-md transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2 text-thrid bg-accent"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => toast.success(`${playlist_name} deleted`)}
              className="rounded-md transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2  border-2 border-black"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

//expand

function PlaylistCard({ playlist }) {
  const [expand, setExpand] = useState(false);
  const [cardView, setCardView] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("expand")) setExpand((prev) => !prev);
      }}
      className={`expand relative border-2 border-black p-6 py-10 cursor-pointer hover:scale-[101%] transition-transform ease-in-out w-full  ${
        expand ? "h-80 mb-20  " : "h-40"
      }`}
      style={{ transition: "height 0.2s ease-in-out" }}
    >
      <div className="expand gap-4 items-center">
        <h1 className="expand font-semibold mb-2 text-xl">
          {playlist.playlist_name}
        </h1>
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
      {expand && (
        <div className="flex justify-end align-top my-4">
          <button
            onClick={() => setCardView((prev) => !prev)}
            className={`rounded-lg z-20 hover:scale-105 transition-all duration-200 text-thrid font-bold px-4 p-2 bg-accent`}
          >
            Edit
          </button>
        </div>
      )}
      <div
        className={`expand flex gap-4 overflow-scroll no-scrollbar transition-all duration-500 ease-in-out`}
      >
        {playlist.movies &&
          expand &&
          playlist.movies.map((item, indx) => (
            <div
              key={indx}
              onClick={(indx) => navigate(`/movie/${indx}`)}
              className="w-52 h-60 flex flex-shrink-0 p-4  justify-end items-end group bg-gray-700"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success(
                    `${indx} removed from ${playlist.playlist_name}`
                  );
                }}
                className="w-8 h-8 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-accent rounded-lg hover:-rotate-12 active:scale-90 "
              ></div>
            </div>
          ))}
      </div>

      {expand && cardView && (
        <EditCard playlist_name={playlist.playlist_name} />
      )}
    </div>
  );
}

function PlaylistBody({ playlist }) {
  return (
    <div className="flex gap-10 flex-wrap">
      {playlist.map((item, key) => {
        return <PlaylistCard key={key} playlist={item} />;
      })}
    </div>
  );
}

function Body() {
  const {response, err, loading, fetchData}=useFetchData()
  const [movies, setMovies]=useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        await fetchData("http://localhost:3000/api/lists/watchlist/l", "get");
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies(); // Call the async function
  }, []); // Dependencies should include response and fetchData

  useEffect(()=>{
    console.log(response)
    if (response) {
      setMovies(response.results); // Set the movies after the response is ready
    }
  },[fetchData])
  return (
    <div>
      <div className="flex flex-col gap-6">
        {Array.isArray(movies) &&
          movies.length > 0 &&
          movies.map((item, key) => (
            <SmallMovieCard key={key} id={key} {...item} />
          ))}
      </div>
    </div>
  );
}

function Collection() {
  const [movies, setMovies] = useState([
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watchlist",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watched",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watchlist",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
  ]);
  const movie = [
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watchlist",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watched",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watchlist",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
  ];
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
  const tabs = [
    {
      tab: "Watchlist",
      title: `YOU WANT TO SEE ${movies.length} FILMS`,
    },
    {
      tab: "Playlist",
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

  useEffect(() => {
    //fetch movies
    toast.info("fetched movies");
  }, []);
  function tabManager(index) {
    setActive(index);
    setMovies(movie.filter((item) => item.tag == tabs[index].tab));
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
      <div className="flex gap-4 items-center font-semibold my-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className=" text-xl">{tabs[active].title}</h1>
      </div>
      {tabs[active].tab === "Playlist" ? (
        <PlaylistBody playlist={playlist} />
      ) : (
        <Body movies={movies} />
      )}
    </div>
  );
}

export default Collection;
