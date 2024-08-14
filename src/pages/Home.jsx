import { useNavigate } from "react-router-dom";
import MovieHolder from "../components/MovieHolder";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

function Home() {
  const data = [
    {
      title: "Trending Movies",
      options: {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
        },
      },
      url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    },
    {
      title: "Top Rated",
      options: {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
        },
      },
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    },
    {
      title: "Liked Movies",
      options: {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
        },
      },
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
          <h1 className="font-bold text-4xl mb-10">Welcome Back, [User]</h1>
          <input
            value={formik.values.searchQuery}
            onChange={formik.handleChange}
            name="searchQuery"
            className="w-full px-4 p-3 bg-main border-2 border-black outline-none mb-4"
            placeholder=""
            type="text"
          />
          <div>
            <button
              onClick={() => formik.submitForm()}
              className="transition duration-300 hover:scale-105 active:scale-95 bg-accent border-2 border-accent text-thrid p-2 px-4 rounded-lg  ml-2 mr-6"
            >
              Search
            </button>
            <button
              onClick={(e) => navigate(`/discover`)}
              className="transition duration-300 hover:scale-105 active:scale-95 bg-main border-2 border-black text-black p-2 px-4 rounded-lg"
            >
              Discover
            </button>
          </div>
        </div>
        <div className="h-full border-2 border-black w-1/2 overflow-hidden">
          <img src="../public/fan.jpg" alt="" />
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
