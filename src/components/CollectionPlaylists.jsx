import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import { btnClassName, btnClassName2 } from "../utils/css";
import { toast } from "sonner";
import Loading from "../pages/helper";

function EditCard({ playlist_name }) {
    const formik = useFormik({
      initialValues: {
        playlistName: "",
        playlistDetails: "",
        x,
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


  function Skeleton() {
    return <div className="bg-gray-500 w-full h-20 skeleton-shimmer"></div>;
  }

function NameDescriptionCard({addPlaylistStateHandler, username}) {
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
      fetchData(`http://localhost:3000/api/lists/playlist/${username}`, "POST", values);
    },
  });

  useEffect(()=>{
    if (response) toast.success(response.message)
    addPlaylistStateHandler()
  },[response])
  return (
    <div className="bg-main shadow-xl absolute z-30  left-1/2 -translate-x-1/2 rounded-md p-6 w-1/3">
      <h2 className="text-lg font-semibold mb-4">Playlist Name & Description</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name</label>
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
          <label htmlFor="description" className="mb-1">Description</label>
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
        <button
          type="submit"
          className={btnClassName}
        >
          {loading? <Loading/>:"Submit"}
        </button>
        <button
            onClick={addPlaylistStateHandler}
          className={btnClassName2}
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}


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
            {playlist?.name}
          </h1>
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
  
  
function PlaylistBody({username }) {
    const [playlist, setPlaylist]=useState([])
    const [addPlaylistState, setAddPlaylistState]=useState(false)

    const {response, error, loading, fetchData}=useFetchData()
    useEffect(()=>{
      fetchData(`http://localhost:3000/api/lists/playlist/${username}`, 'get')
    },[])
    useEffect(()=>{
       if (response)
        setPlaylist(response.playlists)
    },[response])  
    const addPlaylistStateHandler=()=>setAddPlaylistState(prev=>!prev)


    const renderMovies=()=>{
        if (loading)
            return Array.from({ length: 5 }).map((item) => {
              return <Skeleton />;
            });
          else if (error)
            return (
              <div className="font-bold text-center text-xl">
                Coudn't Fetch Data Try Reloading the page
              </div>
            );
          else if (playlist.length === 0)
            return (
              <div className="font-bold text-center text-xl">No Movies Found</div>
            );
        else{
            return (playlist.map((item, key) => {
                return <PlaylistCard key={key} playlist={item} />;
              }))
        }
    }
    return (
      <div className="flex gap-10 flex-col">
        <div className="flex gap-4 items-center font-semibold my-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">{`PLAYLISTS YOU HAVE: ${playlist.length}`}</h1>
        </div>
        <div className="flex justify-center"> <img src="/add.png" onClick={addPlaylistStateHandler} className="w-14 hover:rotate-90 active:scale-90 cursor-pointer transition-all duration-200" alt="" /> </div>
        {addPlaylistState && <NameDescriptionCard addPlaylistStateHandler={addPlaylistStateHandler} username={username}/>}
        {
            renderMovies()
        }
      </div>
    );
  }
  export default PlaylistBody