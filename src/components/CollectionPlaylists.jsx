import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import { btnClassName, btnClassName2 } from "../utils/css";
import { toast } from "sonner";
import Loading, { Scroller } from "./helper";
import { useSelector } from "react-redux";

function EditCard({ playlist, cardViewHandler, fetchPlaylists }) {
  const { loading, response, error, fetchData } = useFetchData();
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      name: `${playlist?.name || ""}`,
      description: `${playlist?.description || ""}`,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Playlist Name is required"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      fetchData(
        `http://localhost:3000/api/lists/playlist/${user.username}/${playlist._id}`,
        "PUT",
        values
      );
    },
  });
  const deletePlaylist = () => {
    fetchData(
      `http://localhost:3000/api/lists/playlist/${user.username}/${playlist._id}`,
      "DELETE"
    ).then(() => {
      fetchPlaylists();
      cardViewHandler(); // Close the edit form
    });
  };

  useEffect(() => {
    if (response) {
      toast.success(response?.message);
      cardViewHandler();
      fetchPlaylists();
    }
  }, [response]);
  return (
    <div className="border-2 top-0  border-black z-30 absolute bg-main flex flex-col p py-10 p-4 gap-4 mt-6 w-fit">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            className={`rounded-lg px-4 p-2 outline-none border-2 `}
            type="text"
            placeholder="Playlist Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-black">{formik.errors.name}</div>
          ) : null}

          <input
            className={`rounded-lg px-4 p-2 outline-none border-2 `}
            type="text"
            placeholder="Playlist Details"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-black">{formik.errors.description}</div>
          ) : null}

          <div className="flex gap-4 font-semibold">
            <button
              type="submit"
              className="rounded-md transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2 text-thrid bg-accent"
            >
              {loading ? <Loading /> : "Update"}
            </button>
            <button
              type="button"
              onClick={deletePlaylist}
              className="rounded-md transition-all duration-300 hover:scale-105 active:scale-95 px-4 p-2  border-2 border-black"
            >
              {loading ? <Loading /> : "Delete"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Skeleton() {
  return <div className="bg-gray-500 w-full h-20 skeleton-shimmer"></div>;
}

function NameDescriptionCard({ addPlaylistStateHandler, username }) {
  // Initialize Formik with validation
  const { response, err, loading, fetchData } = useFetchData();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 characters or less")
        .required("Name is required"),
      description: Yup.string()
        .max(100, "Description must be 100 characters or less")
        .required("Description is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      fetchData(
        `http://localhost:3000/api/lists/playlist/${username}`,
        "POST",
        values
      );
    },
  });

  useEffect(() => {
    if (response) toast.success(response.message);
    addPlaylistStateHandler();
  }, [response]);
  return (
    <div className="bg-main shadow-xl absolute z-30  left-1/2 -translate-x-1/2 rounded-md p-6 w-1/3">
      <h2 className="text-lg font-semibold mb-4">
        Playlist Name & Description
      </h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`p-2 border rounded ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`p-2 border rounded ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="space-x-3">
          <button type="submit" className={btnClassName}>
            {loading ? <Loading /> : "Submit"}
          </button>
          <button onClick={addPlaylistStateHandler} className={btnClassName2}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function PlaylistCard({
  playlist,
  expand,
  expandHandler,
  cardView,
  cardViewHandler,
  fetchPlaylists,
}) {
  const { response, error, fetchData, loading } = useFetchData();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const removeMovie = (e, movieId) => {
    e.stopPropagation();
    fetchData(
      `http://localhost:3000/api/lists/playlist/${user.username}/${playlist._id}/${movieId}`,
      "DELETE"
    );
  };
  useEffect(() => {
    if (response) {
      toast.success(response?.message);
      fetchPlaylists();
    }
  });

  const [imageError, setImageError] = useState(false);
  const ref=useRef()
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("expand")) expandHandler(playlist._id);
      }}
      className={`expand relative border-2 border-black p-6 py-10 cursor-pointer  transition-transform ease-in-out w-full  ${
        expand === playlist._id ? "h-96 mb-44" : "h-40"
      }`}
      style={{ transition: "height 0.2s ease-in-out" }}
    >
      <div className="expand gap-4 items-center">
        <h1 className="expand font-semibold mb-2 text-xl">{playlist?.name}</h1>
        <div className="expand leading-5 mb-4 text-sm">
          <p className="expand">
            <span className="expand font-semibold">Movies:</span>{" "}
            {playlist?.movies?.length ? playlist?.movies?.length : 0}
          </p>
          <p className="expand">
            <span className="expand font-semibold">Description:</span>{" "}
            {playlist?.description}
          </p>
        </div>
      </div>
      {expand === playlist._id && (
        <div className="flex justify-end align-top my-4">
          <button
            onClick={cardViewHandler}
            className={`rounded-lg z-20 hover:scale-105 transition-all duration-200 text-thrid font-bold px-4 p-2 bg-accent`}
          >
            Edit
          </button>
        </div>
      )}
      <div className="relative">
      <div
      ref={ref}
        className={`expand  flex gap-4 overflow-y-hidden overflow-x-scroll no-scrollbar transition-all duration-500 ease-in-out`}
      >
        {expand === playlist._id &&
          playlist?.movies?.map((movie, indx) => (
            <div
              key={movie.movieId}
              onClick={() => navigate(`/movie/${movie.movieId}`)}
              className=" lg:w-60 w-44 relative flex-shrink-0 hover:scale-[101%] transition-all duration-200 group"
            >
              <div
                onClick={(e) => removeMovie(e, movie.movieId)}
                className="w-8 h-8 left-1/2 bottom-4 -translate-x-1/2 absolute opacity-0 transition-all duration-300 bg-main p-2 rounded-[50%] group-hover:opacity-100 hover:-rotate-90 active:scale-90"
              >
                {loading? <Loading/> :<img src="delete.png" alt="" />}
              </div>
              {(!movie.posterPath && !imageError) ? (
                <div className=" h-full w-full bg-accent flex items-center justify-center text-thrid font-medium">Couldn't Load Image </div>
              ) : (
                <img
                  src={movie.posterPath}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          ))}
      {playlist?.movies && expand === playlist._id && <Scroller containerRef={ref}/>}
      </div>

      </div>

      {expand === playlist._id && cardView && (
        <EditCard
          fetchPlaylists={fetchPlaylists}
          cardViewHandler={cardViewHandler}
          playlist={playlist}
        />
      )}
    </div>
  );
}

function PlaylistBody({ username }) {
  const [playlist, setPlaylist] = useState([]);
  const [addPlaylistState, setAddPlaylistState] = useState(false);

  const { response, error, loading, fetchData } = useFetchData();

  const fetchPlaylists = () =>
    fetchData(`http://localhost:3000/api/lists/playlist/${username}`, "get");
  useEffect(() => {
    fetchPlaylists();
  }, [username]);
  useEffect(() => {
    if (response) setPlaylist(response.playlists);
  }, [response]);

  const addPlaylistStateHandler = () => setAddPlaylistState((prev) => !prev);

  const [expand, setExpand] = useState(null);
  const [cardView, setCardView] = useState(null);
  const cardViewHandler = () => {
    setCardView((prev) => !prev);
  };
  const expandHandler = (playlist_id) => {
    setExpand(expand === playlist_id ? null : playlist_id); // Toggle the expand state
  };
  const renderMovies = () => {
    if (loading)
      return Array.from({ length: 5 }).map((item) => {
        return <Skeleton />;
      });
    else if (error)
      return (
        <div className="font-bold text-center text-xl space-y-2">
          <p> Coudn't Fetch Data Try Reloading the page</p>
          <button className={btnClassName} onClick={fetchPlaylists}>
            Retry
          </button>
        </div>
      );
    else if (playlist.length === 0)
      return (
        <div className="font-bold text-center text-xl">No Movies Found</div>
      );
    else {
      return playlist.map((item, key) => {
        return (
          <PlaylistCard
            fetchPlaylists={fetchPlaylists}
            cardView={cardView}
            expand={expand}
            cardViewHandler={cardViewHandler}
            expandHandler={expandHandler}
            key={key}
            playlist={item}
          />
        );
      });
    }
  };
  return (
    <div className="flex gap-10 flex-col">
      <div className="flex gap-4 items-center font-semibold my-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className=" text-xl">{`PLAYLISTS YOU HAVE: ${playlist.length}`}</h1>
      </div>
      <div className="flex justify-center">
        {" "}
        <img
          src="/add.png"
          onClick={addPlaylistStateHandler}
          className="w-14 hover:rotate-90 active:scale-90 cursor-pointer transition-all duration-200"
          alt=""
        />{" "}
      </div>
      {addPlaylistState && (
        <NameDescriptionCard
          addPlaylistStateHandler={addPlaylistStateHandler}
          username={username}
        />
      )}
      {renderMovies()}
    </div>
  );
}
export default PlaylistBody;
