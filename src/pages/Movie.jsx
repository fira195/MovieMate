import { toast } from "sonner";
import MovieCard from "../components/MovieCard";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./helper";
import PosterImage from "../components/PosterImage";
import useFetchData from "../hooks/useFetch";
import { useSelector } from "react-redux";
import MovieAction from "../components/MovieActions";

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
    `IMBD: ${movie?.imdbRating || "-"}`,
    `Genre: ${movie?.Genre || "-"}`,
    `Director: ${movie?.Director || "-"}`,
    `Release Date: ${movie?.Released || "-"}`,
    `Runtime: ${movie?.Runtime || "-"}`,
  ];
  const scrollToReview = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };

  
  return (
    <div className="flex flex-col md:flex-row gap-10 border-2 border-accent relative items-center">
      {/* backGround */}
      {movie?.movie && (
        <div
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center blur-md"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.movie?.backdrop_path})`,
          }}
        ></div>
      )}

      {/* poster */}
      <div className="flex flex-col  z-10 gap-4 pb-4 items-center relative">
        <div className="absolute inset-0 bg-main bg-opacity-70 -z-10 h-full"></div>
        <PosterImage
          src={movie?.Poster}
          alt={movie?.Title}
          width={"w-[250px]"}
        />
          <MovieAction movie={movie}/>
      </div>

      {/* Details */}
      <div className="z-10 relative p-4 h-fit space-y-4">
        <div className="absolute inset-0 bg-main bg-opacity-70 -z-10 h-full"></div>
        {movie?.Title ? (
          <h1 className="font-bold text-xl my-6">
            {movie?.Title}{" "}
            <span className="text-accent">({movie?.Year && movie?.Year})</span>
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
        {movie?.Plot ? <p>{movie.Plot}</p> : <Skeleton />}
      </div>

      <Trailer youtubeUrl={movie?.youtubeUrl} />

      <Cast credits={movie?.credits} />

      <div ref={ref}>
        <Review />
      </div>

      <SimilarMovies similarMovies={movie?.similarMovies} />
    </div>
  );
}

function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const link = `http://localhost:3000/api/movies/movie/${id}`;
  const { loading, err, response, fetchData } = useFetchData();

  useEffect(() => {
    fetchData(link, "GET");
  }, [id, navigate]);

  return (
    <div className="bg-main pt-20 p-5 md:px-20">
      <Body key={response?.imdb_id} movie={response} />
    </div>
  );
}

export default Movie;
