import {  useState } from "react";
import MovieHolder from "../components/MovieHolder";
import { useSelector } from "react-redux";
import Loading from "./helper";
function Discover() {
  const { genres, status, error } = useSelector((state) => state.genres);
  const [title, setTitle] = useState({ id: 28, name: "Action" });
  const data = [
    {
      title: `${title.name}`,
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
        Math.floor(Math.random() * 10) + 1
      }&sort_by=popularity.desc&with_genres=${title.id}`,
    },
    {
      title: "Top Rated",
      url: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
        Math.floor(Math.random() * 10) + 1
      }`,
    },
    {
      title: "Liked Movies",
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    },
  ];
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
    },
  };
  function fetchGenre() {
    if (status === "loading" || status === "idle") {
      return (
        <div className="m-auto font-bold">
          <Loading />
          <p>Loading Genres</p>
        </div>
      );
    } else if (status === "failed")
      return <div className="m-auto font-bold">Coudn't Fetch Genres</div>;
    else {
      return (
        genres &&
        genres.map((item, key) => {
          return (
            <div
              key={key}
              onClick={() => setTitle(item)}
              className="flex flex-col flex-shrink-0 font-semibold hover:scale-105 active:scale-95 transition duration-300 cursor-pointer justify-end w-40 h-20 p-4 rounded-xl border-2 border-black"
            >
              {item.name}
            </div>
          );
        })
      );
    }
  }
  return (
    <div className="min-h-screen  bg-main relative ">
      <div className=" h-52 absolute w-full z-0 flex items-center overflow-hidden">
        <p className="font-bold text-2xl ml-16 z-10">Discover</p>
        <img
          src="https://image.tmdb.org/t/p/original/avedvodAZUcwqevBfm8p4G2NziQ.jpg"
          className="absolute left-0 blur-md"
          alt=""
        />
      </div>
      <div className="relative z-10 pl-10 flex flex-wrap gap-8 pt-60 justify-start">
        {fetchGenre()}
      </div>
      <div className="pl-4 space-y-10 mt-10">
        {data.map((item, indx) => (
          <MovieHolder key={indx} {...item} options={options} />
        ))}
      </div>
    </div>
  );
}

export default Discover;
