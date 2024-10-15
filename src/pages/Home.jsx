import { useNavigate } from "react-router-dom";
import MovieHolder from "../components/MovieHolder";
import { useFormik } from "formik";
import { btnClassName, btnClassName2  } from "../utils/css";


function Home() {
  const data = [
    {
      title: "Trending Movies",
      url: "/api/movies/trending",
    },
    {
      title: "Top Rated",
      url: "/api/movies/top-rated",
    },
    {
      title: "Liked Movies",
      url: "/api/movies/trending",
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
    <div className="bg-main h-auto px-10 md:px-20 pt-20">
      <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-4 font-semibold items-center">
        <div className="mt-20 lg:col-span-6 col-span-4">
          <h1 className="font-bold md:text-4xl text-3xl mb-10">Welcome Back, [User]</h1>
          <input
            value={formik.values.searchQuery}
            onChange={formik.handleChange}
            name="searchQuery"
            className="w-3/4 px-4 p-3 font-normal bg-main border-2 border-black outline-none mb-4"
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
        <div className="borde-2 hidden lg:inline lg:col-span-6 md:col-span-4 md:inline border-black w-fit">
          <img src="/fan.jpg" alt="" />
        </div>
      </div>
      <div className="gap-12 mt-10 flex flex-col">
        {data.map((item, indx) => (
          <MovieHolder key={indx} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
