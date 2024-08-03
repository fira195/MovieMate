import { toast } from "sonner";
import MovieCard from "../components/MvieCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Body({ movie,  actions }) {
  const details = [
    `IMBD: ${movie.imdbRating}`,
    `Genre: ${movie.Genre}`,
    `Director: ${movie.Director}`,
    `Release Date: ${movie.Released}`,
    `Runtime: ${movie.Runtime}`,
  ];
  return (
    <div className="space-y-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 pb-4 items-center">
          <div className="w-5/6 bg-gray-500">
            <img src={movie.Poster} alt="" />
          </div>
          <div className="flex gap-4 duration-200">
            <div
              onClick={(e) => actions(e)}
              className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md border-2 border-black w-7 h-7 hover:scale-105"
            ></div>
            <div
              onClick={(e) => actions(e)}
              className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md bg-accent w-7 h-7 hover:scale-105"
            ></div>
            <div
              onClick={(e) => actions(e)}
              className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md border-2 border-black w-7 h-7 hover:scale-105"
            ></div>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl my-6">
            {movie.Title} <span className="opacity-80">({movie.Year})</span>
          </h1>
          {details.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          <div className="flex justify-center mt-7 gap-4 items-center">
            <div className="border-2 border-black flex gap-4 p-1 justify-center rounded-xl">
              <div className="size-7 rounded-2xl border-2 border-black"></div>
              <div className="size-7 rounded-2xl border-2 border-black"></div>
              <div className="size-7 rounded-2xl border-2 border-black"></div>
              <div className="size-7 rounded-2xl border-2 border-black"></div>
              <div className="size-7 rounded-2xl border-2 border-black"></div>
            </div>
            <button className="bg-accent size-fit hover:scale-105 active:scale-90 transition duration-300 text-thrid p-2 px-3 rounded-xl">
              Review
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Plot</h1>
        </div>
        <p>{movie.Plot}</p>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Trailer</h1>
        </div>
        <div className="w-full h-56 bg-gray-500"></div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Cast</h1>
        </div>
        <div className="w-full h-56 border-2 border-black flex overflow-scroll no-scrollbar gap-8 items-center text-black p-4">
          {}
        </div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Review</h1>
        </div>
        <div className="w-full p-4 border-2 border-black">
          <textarea className="w-full h-56 bg-thrid p-4 outline-none focus:border-2 border-accent"></textarea>
          <button className="my-4 bg-accent size-fit hover:scale-105 active:scale-90 transition duration-300 text-thrid p-2 px-3 rounded-xl">
            Send Now
          </button>
        </div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Similar</h1>
        </div>
        <div className="border-2 border-black w-full flex flex-wrap gap-6 p-4">
          {
            //movies.map((item, key) =>  <MovieCard key={key} id={key}/> )
          }
        </div>
      </div>
    </div>
  );
}

function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const actions = (e) => {
    e.stopPropagation();
    toast.success("some action");
  };
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res)
        setMovie(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  return (
    <div className="bg-main pt-28 px-20">
      {!isLoading ? (
        <Body movie={movie} actions={actions} />
      ) : (
        <div className="h-screen">Loading...</div>
      )}
    </div>
  );
}

export default Movie;
