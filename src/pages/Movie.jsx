import { toast } from "sonner";
import MovieCard from "../components/MvieCard";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./helper";
import PosterImage from "../components/PosterImage";


function Skeleton() {
  return <div className="bg-gray-500 h-8 w-full skeleton-shimmer"></div>;
}

function Rating() {
  const [rating, setRating] = useState(0);
  const totalStars = 5;

  const handleRating = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex  gap-4 justify-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <div
          key={index}
          onClick={() => handleRating(index)}
          className="size-7 cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={rating > index ? "/fav.png" : "/notFav.png"}
            alt={rating > index ? "Favorited" : "Not Favorited"}
          />
        </div>
      ))}
    </div>
  );
}

function BasicMovieInfo({ movie, reviewRef }) {
  const details = [
    `IMBD: ${movie.imdbRating || "-"}`,
    `Genre: ${movie.Genre || "-"}`,
    `Director: ${movie.Director || "-"}`,
    `Release Date: ${movie.Released || "-"}`,
    `Runtime: ${movie.Runtime || "-"}`,
  ];
  const scrollToReview = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex flex-col md:flex-row gap-10 border-2 border-accent relative items-center">
      {/* backGround */}
      {
        movie.movie && <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center blur-md"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.movie.backdrop_path})`,
        }}
      ></div>
      }

      {/* poster */}
      <div className="flex flex-col  z-10 gap-4 pb-4 items-center relative">
        <div className="absolute inset-0 bg-main bg-opacity-70 -z-10 h-full"></div>
        <PosterImage src={movie.Poster} alt={movie.Title} width={"w-[250px]"} />

        <div className="flex gap-4 duration-200">
          {[1, 2, 3].map((_, index) => (
            <button
              key={index}
              onClick={(e) => actions(e)}
              className="hover:-rotate-12 active:scale-90 transition duration-300 rounded-md border-2 border-black w-7 h-7 hover:scale-105"
              aria-label={`Action ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="z-10 relative p-4 h-fit space-y-4">
        <div className="absolute inset-0 bg-main bg-opacity-70 -z-10 h-full"></div>
        {movie.Title ? (
          <h1 className="font-bold text-xl my-6">
            {movie.Title}{" "}
            <span className="text-accent">({movie.Year && movie.Year})</span>
          </h1>
        ) : (
          <Skeleton />
        )}
        <div>
          {details.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="flex flex-col md:flex-row  w-fit justify-center gap-4 md:items-center">
          <Rating />
          <button
            onClick={scrollToReview}
            className="bg-accent size-fit hover:scale-105 active:scale-90 transition duration-300 text-thrid p-2 px-3 rounded-xl"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

function Cast({ credits }) {
  const [inView, setInView] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView((prev) => ({ ...prev, [entry.target.id]: true }));
          } else {
            setInView((prev) => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".cast-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [credits]);

  return (
    <div className="shadow-xl p-3">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">Cast</h1>
      </div>
      <div className="w-full bg-accent text-thrid border-2 border-black flex overflow-scroll no-scrollbar gap-4 items-center text-sm p-4">
        {credits ? (
          credits.cast &&
          credits.cast.map((item) => {
            const isVisible = inView[item.name] !== false;
            return (
              <div
                key={item.name}
                id={item.name}
                className={`cast-item flex-shrink-0 w-[154px] border-2 border-accent p-2 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {isVisible && (
                  <>
                    <PosterImage
                      src={`https://image.tmdb.org/t/p/w154${item.profile_path}`}
                      alt={"picture"}
                      width={"size-40"}
                    />
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.name}
                    </p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.character}
                    </p>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

function Trailer({ youtubeUrl }) {
  return (
    <div className="shadow-xl p-3">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">Trailer</h1>
      </div>
      <div className="w-full flex justify-center">
        {youtubeUrl ? (
          <iframe
            width="1000"
            height="500"
            src={youtubeUrl}
            title="How To Embed YouTube Videos in React / Gatsby (and make them Responsive)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
function Review() {
  return (
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
  );
}
function SimilarMovies({ similarMovies }) {
  return (
    <div className="shadow-xl p-3">
      <div className="flex gap-4 items-center font-semibold mb-6">
        <div className="bg-accent h-10 w-2 ml-2"></div>
        <h1 className="text-xl">Similar</h1>
      </div>
      <div className="border-2 border-black flex flex-wrap gap-6 md:p-4 p-0 justify-evenly">
        {similarMovies ? (
          similarMovies.results.map((item, key) => (
            <MovieCard key={key} movie={item} />
          ))
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
function Body({ movie, actions }) {
  const ref = useRef();
  return (
    <div className="space-y-10">
      <BasicMovieInfo movie={movie} reviewRef={ref} />

      {/* PLOT */}
      <div className="shadow-xl md:p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Plot</h1>
        </div>
        {movie.Plot ? <p>{movie.Plot}</p> : <Skeleton />}
      </div>

      <Trailer youtubeUrl={movie.youtubeUrl} />

      <Cast credits={movie.credits} />

      <div ref={ref}>
        <Review />
      </div>

      <SimilarMovies similarMovies={movie.similarMovies} />
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
        const ombdUrl = `http://www.omdbapi.com/?i=${
          movie.imdb_id
        }&apikey=${"90a5e067"}`;
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

        setMovie({ ...ratings, credits, youtubeUrl, similarMovies, movie }); // Combine data with credits and video URL
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className="bg-main pt-20 p-5 md:px-20">
      <Body key={movie.imdb_id} movie={movie} actions={actions} />
    </div>
  );
}

export default Movie;
