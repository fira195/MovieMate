import { useFormik } from "formik";
import MovieCard from "../components/MvieCard";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Loading from "./helper";

function Search() {
  const [resultPageNumber, setResultPageNumber] = useState([1, 2, 3, 4, 5]);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const fetchResults = () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?&query=${formik.values.searchQuery}&language=en-US&page=${currentPage}`,
      options
    )
      .then((res) => {
        if (!res.ok) throw Error("Couldnt Fetch Data...");
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setMovies(res.results);
        setLoading(false)
      })
      .catch((e) => {
        toast.error(e.message);
        setErr(e.message);
        console.log(e);
        setLoading(false)
      });
  };

  const formik = useFormik({
    initialValues: {
      searchQuery: "",
    },
    onSubmit: fetchResults,
  });

  const ref = useRef();
  useEffect(() => {
    const keydown = (e) => {
      if (e.keyCode === 13) formik.submitForm();
    };
    ref.current.addEventListener("keydown", keydown);
  }, []);

  return (
    <div className={`bg-main relative" ${!movies && "h-screen"}`}>
      <div className="bg-main border-b-2 border-black h-52 absolute w-full z-0"></div>
      <div className="w-full text-center relative z-10 pt-44">
        <div>
          <input
            ref={ref}
            name="searchQuery"
            value={formik.values.searchQuery}
            onChange={formik.handleChange}
            placeholder="Search Movie"
            type="text"
            className="outline-none w-1/2 p-4 bg-thrid text-black"
          />
          <button>Search</button>
        </div>
        <div className="w-full flex justify-center mt-5 gap-10">
          <div className="flex bg-main border-2 border-black   cursor-pointer p-2 px-4 items-center gap-6">
            <p>Year</p>
            <div className="bg-thrid w-3 h-1"></div>
          </div>
          <div className="flex bg-main border-2 border-black cursor-pointer p-2 px-4 items-center gap-6">
            <p>Genre</p>
            <div className="bg-thrid w-3 h-1"></div>
          </div>
          <div className="flex bg-main border-2 border-black cursor-pointer p-2 px-4 items-center gap-6">
            <p>Rating</p>
            <div className="bg-thrid w-3 h-1"></div>
          </div>
          <div className="flex bg-main border-2 border-black cursor-pointer p-2 px-4 items-center gap-6">
            <p>Sort</p>
            <div className="bg-thrid w-3 h-1"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center font-semibold my-6 m-4">
        <div className="bg-accent h-10 w-2 ml-2"></div>

        {err ? (
          <h1 className=" text-xl">{err}</h1>
        ) : movies ? (
          <h1 className=" text-xl">Results for: {formik.values.searchQuery}</h1>
        ) : (
          <h1 className=" text-xl">Enter Movie Name </h1>
        )}
      </div>
      {loading ? (
        <Loading />
      ) : movies && movies.length === 0 ? (
        <h1 className=" text-xl m-auto self-end place-self-center">
          No Movies Found{" "}
        </h1>
      ) : (
        movies && (
          <div className="bg-main border-2 border-black  h-auto relative w-[97%] gap-6 mx-4 p-6 pb-28 grid grid-cols-5">
            {movies && movies.map((item) => <MovieCard movie={item} />)}
            <div className="p-2 px-4 flex transform -translate-x-1/2 absolute left-1/2 mx-auto bottom-10 justify-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1))
                }
                className="bg-main hover:bg-accent hover:text-thrid active:scale-95 border-2 border-black text- p-2 px-3 rounded"
              >
                Previous
              </button>
              {resultPageNumber.map((item) => (
                <div
                  onClick={() => setCurrentPage(item)}
                  className={`${
                    currentPage === item && "bg-accent text-thrid"
                  }  size-10 hover:bg-accent hover:text-thrid cursor-pointer border-black items-center flex place-content-center`}
                >
                  {item}
                </div>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev === resultPageNumber.length ? prev : prev + 1
                  )
                }
                className="bg-main hover:bg-accent hover:text-thrid active:scale-95 border-2 border-black p-2 px-3 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Search;
