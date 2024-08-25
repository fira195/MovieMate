import { useFormik } from "formik";
import MovieCard from "../components/MvieCard";
import { useEffect, useRef, useState } from "react";
import Loading, { Pagination } from "./helper";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

function SearchForm({ search, onSubmitSearch, loading }) {
  const ref = useRef();
  const formik = useFormik({
    initialValues: { searchQuery: search },
    onSubmit: (values) => {
      onSubmitSearch(values.searchQuery);
    },
  });
  useEffect(() => {
    const keydown = (e) => {
      if (e.keyCode === 13) formik.submitForm();
    };
    if (ref.current) ref.current.addEventListener("keydown", keydown);
    return () =>{if (ref.current) ref.current.removeEventListener("keydown", keydown)};
  }, []);

  return (
    <input
      ref={ref}
      name="searchQuery"
      value={formik.values.searchQuery}
      onChange={formik.handleChange}
      placeholder="Search Movie"
      type="text"
      className="outline-none w-full  md:w-1/2 p-4 bg-thrid text-black"
      disabled={loading}
    />
  );
}




function Search() {
  //search Term 
  const { query } = useParams();
  const [search, setSearch] = useState(query || "");
  const navigate=useNavigate()
  const onSubmitSearch = (searchTerm) => {
    setSearch(searchTerm);
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
  };
  
  const [currentPage, setCurrentPage] = useState(1);

  //delay the api call
  const debouncedSearch = useDebounce(search, 500);

  const link=`https://api.themoviedb.org/3/search/movie?&query=${search}&language=en-US&page=${currentPage}`
  const {loading, err, movies, resultPageNumber, fetchData}=useFetchData(link, search, currentPage)

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.trim()) {
 
      fetchData()
      } 
  }, [search, currentPage]);

  
  return (
    <div className={`bg-main relative ${!movies && "h-screen"} p-10 md:px-20`}>
      {/* <div className=" border-b-2 border-black h-52 absolute top-full z-0"></div> */}

      <div className="w-full text-center relative z-10 pt-44">
        <SearchForm search={search} onSubmitSearch={onSubmitSearch} loading={loading}/>
      </div>

      <div className="flex gap-4 items-center font-semibold my-6 m-4">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        {err ? (
          <h1 className="text-xl">{err}</h1>
        ) : movies ? (
          <h1 className="text-xl">Results for: {search}</h1>
        ) : (
          <h1 className="text-xl">Enter Movie Name</h1>
        )}
      </div>

      {loading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : movies && movies.length === 0 ? (
        <h1 className="text-xl text-center font-bold h-screen">
          No Movies Found
        </h1>
      ) : (
        movies && (
          <div className="border-2 border-black relative flex flex-wrap justify-evenly gap-6 py-4">
            {movies.map((item) => <MovieCard key={item.id} movie={item} />)}
            <Pagination
              currentPage={currentPage}
              resultPageNumber={resultPageNumber}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Search;
