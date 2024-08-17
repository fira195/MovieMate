import { useNavigate } from "react-router-dom";
import MovieHolder from "../components/MovieHolder";
import { useFormik } from "formik";
import { btnClassName, btnClassName2  } from "../utils/css";

function Home() {
  const data = [
    {
      title: "Trending Movies",
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    },
    {
      title: "Top Rated",
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    },
    {
      title: "Liked Movies",
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    },
  ];

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { searchQuery: "" },
    onSubmit: () => {
      navigate(`/search/${formik.values.searchQuery}`);
    },
  });


  return (
    <div className="bg-main h-auto p-6">
      <div className=" w-full h-[40rem] flex gap-40 pr-0 pb-20 p-40 font-semibold">
        <div className=" mt-20">
          <h1 className="font-bold text-4xl  mb-10">Welcome Back, [User]</h1>
          <input
            value={formik.values.searchQuery}
            onChange={formik.handleChange}
            name="searchQuery"
            className="w-full px-4 p-3 font-normal bg-main border-2 border-black outline-none mb-4"
            placeholder=""
            type="text"
          />
          <div className="space-x-4 ">
            <button
              onClick={() => formik.submitForm()}
              className={btnClassName}
            >
              Search
            </button>
            <button
              onClick={(e) => navigate(`/discover`)}
              className={btnClassName2}
            >
              Discover
            </button>
          </div>
        </div>
        <div className="h-full border-2 border-black w-1/2 overflow-hidden">
          <img src="/fan.jpg" alt="" />
        </div>
      </div>
      <div className="gap-12 flex flex-col">
        {data.map((item, indx) => (
          <MovieHolder key={indx} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
