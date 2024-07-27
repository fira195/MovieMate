import { toast } from "sonner";
import MovieCard from "../components/MvieCard";

function Movie() {
  const actions = (e) => {
    e.stopPropagation();
    toast.success("some action");
  };
  const details = [
    "Genre: Action/SciFi",
    "Director: Chirstopher Nolan",
    "Release Date: October 26, 2003",
    "Budget: 165 USD",
  ];

  const cast = [
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
    "Scarlett Johanson",
  ];
  const movies = [
    "Avatar (2003)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
    "interstellar (2004)",
  ];
  return (
    <div className="bg-main pt-28 px-20  space-y-10">
      <div className=" flex gap-10">
        <div className="flex flex-col gap-4 pb-4 items-center">
          <div className="h-60 w-52 bg-gray-500"></div>
          <div className=" flex gap-4 duration-200">
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
            Avatar <span className="opacity-80 ">(2003)</span>
          </h1>
          {details.map((item) => (
            <p>{item}</p>
          ))}
          <div className="flex justify-center mt-7 gap-4  items-center">
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
          <div className="bg-accent  h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">Plot</h1>
        </div>
        <p>
          When Earth becomes uninhabitable in the a, a farmer and ex-NASA pilot,
          Joseph Cooper, is tasked to pilot a spacecraft, along with a team of
          researchers, to find a new planet for humans.
        </p>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">Trailer</h1>
        </div>
        <div className="w-full h-56 bg-gray-500"></div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">Cast</h1>
        </div>
        <div className="w-full h-56 border-2 border-black flex overflow-scroll no-scrollbar gap-8 items-center text-black p-4">
          {cast.map((item) => {
            return (
              <div>
                <div className="size-40 cursor-pointer  bg-slate-500"></div>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">Review</h1>
        </div>
        <div className="w-full p-4 border-2 border-black">
          <textarea className="w-full h-56 bg-thrid p-4 "></textarea>
          <button className="my-4 bg-accent size-fit hover:scale-105 active:scale-90 transition duration-300 text-thrid p-2 px-3 rounded-xl">
            Send Now
          </button>
        </div>
      </div>

      <div>
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">Similar</h1>
        </div>
        <div className="border-2 border-black w-full flex flex-wrap gap-6 p-4">
          {movies.map((item, key) =>  <MovieCard key={key} id={key}/>
          )}
        </div>
      </div>
    </div>
  );
}
export default Movie;
