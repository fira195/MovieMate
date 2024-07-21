import MovieCard from "../components/MvieCard";

function Search() {
  const resultPageNumber=[1,2,3,4,5]
  return (
    <div className=" bg-red-950 relative ">
      <div className="bg-gradient-to-b from-gray-500 to-gray-400 h-52 absolute w-full z-0"></div>
      <div className="w-full text-center relative z-10 pt-44">
        <input
          placeholder="Search Movie"
          type="text"
          className="outline-none w-1/2 p-4 bg-yellow-50 text-black"
        />
        <div className="w-full flex justify-center mt-5 gap-10">
          <div className="flex bg-yellow-50 cursor-pointer p-2 px-4 items-center gap-6">
            <p>Year</p>
            <div className="bg-gray-400 w-3 h-1"></div>
          </div>
          <div className="flex bg-yellow-50 cursor-pointer p-2 px-4 items-center gap-6">
            <p>Genre</p>
            <div className="bg-gray-400 w-3 h-1"></div>
          </div>
          <div className="flex bg-yellow-50 cursor-pointer p-2 px-4 items-center gap-6">
            <p>Rating</p>
            <div className="bg-gray-400 w-3 h-1"></div>
          </div>
          <div className="flex bg-yellow-50 cursor-pointer p-2 px-4 items-center gap-6">
            <p>Sort</p>
            <div className="bg-gray-400 w-3 h-1"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center font-semibold my-6 m-4">
        <div className="bg-red-500 h-10 w-2 ml-2"></div>
        <h1 className="text-yellow-50 text-xl">Results for: interstellar</h1>
      </div>
      <div className="bg-yellow-50 h-auto relative w-[97%] gap-6 mx-4 p-6 pb-28 grid grid-cols-5">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      <div className="p-2 px-4 flex transform -translate-x-1/2 absolute left-1/2 mx-auto bottom-10 justify-center bg-red-950 gap-2">
          <button className='bg-red-500 text- p-2 px-3 rounded'>Previous</button>
          {
            resultPageNumber.map(item=> <div className="w-10 h-10 bg-yellow-100 items-center flex place-content-center">{item}</div>)
          }
          <button className='bg-red-500 text-yellow-100 p-2 px-3 rounded'>Next</button>
      </div>
      </div>
    </div>
  );
}

export default Search;
