import { toast } from "sonner";
import MovieCard from "../components/MvieCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Body({ movie, actions }) {
  const details = [
    `IMBD: ${movie.imdbRating || "-"}`,
    `Genre: ${movie.Genre || "-"}`,
    `Director: ${movie.Director || "-"}`,
    `Release Date: ${movie.Released || "-"}`,
    `Runtime: ${movie.Runtime || "-"}`,
  ];

  return (
    <div className="space-y-10">
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 pb-4 items-center">
          <div className="w-[200px] h-full bg-gray-500">
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
            {movie.Title && movie.Title}{" "}
            <span className="text-accent">({movie.Year && movie.Year})</span>
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

      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Plot</h1>
        </div>
        {movie.Plot && <p>{movie.Plot}</p>}
      </div>

      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Trailer</h1>
        </div>
        <div className="w-full flex justify-center">
          <iframe
            width="1000"
            height="500"
            src={movie.youtubeUrl}
            title="How To Embed YouTube Videos in React / Gatsby (and make them Responsive)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Cast</h1>
        </div>
        <div className="w-full  border-2 border-black flex overflow-scroll no-scrollbar gap-8 items-center text-sm p-4">
          {movie.credits &&
            movie.credits.cast &&
            movie.credits.cast.map((item) => {
              return (
                <div key={item.name} className="flex-shrink-0 w-[154px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w154${item.profile_path}`}
                    alt="image"
                  />
                  <p>{item.name} </p>
                  <p> {item.character}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="shadow-xl p-3">
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

      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Similar</h1>
        </div>
        <div className="border-2 border-black w-full flex flex-wrap gap-6 p-4">
          {movie.similarMovies && movie.similarMovies.results.map((item, key) => (
            <MovieCard key={key} movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const actions = (e) => {
    e.stopPropagation();
    toast.success("some action");
  };
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
    }, 
  };
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  const ombd_options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        //fetch imbd id from tmbd
        const response = await fetch(url, options);
        const movie = await response.json();

        // Check if imdb_id exists before fetching from OMDb API
        if (!movie.imdb_id) throw Error("Movie not found");
        const ombdUrl = `http://www.omdbapi.com/?i=${movie.imdb_id }&apikey=${"90a5e067"}`;
        const ombdResponse = await fetch(ombdUrl, ombd_options);
        const ratings = await ombdResponse.json();

        // Fetch credits from TMDb API
        const creditUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`;
        const creditResponse = await fetch(creditUrl, options);
        const credits = await creditResponse.json();

        //Fetch similar movies from TBDb
        const similarUrl = `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&page=1`;
        const similarResponse = await fetch(similarUrl, options);
        const similarMovies = await similarResponse.json();

        // Fetch video information from TMDb (assuming video link is in trailers)
        const videosUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?&language=en-US`;
        const videosResponse = await fetch(videosUrl, options);
        const videoData = await videosResponse.json();

        // Extract YouTube video ID from the first trailer (optional)
        let youtubeUrl = null;
        if (videoData.results && videoData.results.length > 0) {
          const trailer = videoData.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;
          }
        }

        setMovie({ ...ratings, credits, youtubeUrl, similarMovies }); // Combine data with credits and video URL
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className="bg-main pt-28 px-20">
      <Body key={movie.imdb_id} movie={movie} actions={actions} />
    </div>
  );
}

export default Movie;
