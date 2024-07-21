import MovieHolder from "../components/MovieHolder";

function Home() {
  const movies=['Avatar (2003)', 'interstellar (2004)', 'interstellar (2004)', 'interstellar (2004)', 'interstellar (2004)', 'interstellar (2004)', 'interstellar (2004)', 'interstellar (2004)']
  return (
    <div className="bg-red-950 h-auto p-6">
      <div className=" w-full h-[40rem] flex gap-40 pr-0 pb-20 p-40 font-semibold">
        <div className=" mt-20">
          <h1 className="font-bold text-4xl text-yellow-50 mb-10">
            Welcome Back, [User]
          </h1>
          {/* <p className="text-yellow-50 mt-10 mb-4">
            Track your favorite movies and discover new ones!
          </p> */}
          <input
            className="w-full px-3 p-2 rounded-2xl border-2 border-red-300 outline-none mb-4"
            placeholder="Search Movie"
            type="text"
          />
          <div>
            <button className="bg-red-500 text-yellow-100 p-2 px-4 rounded-xl ml-2 mr-6">
              Search
            </button>
            <button className="bg-yellow-50 text-black p-2 px-4 rounded-xl">
              Discover
            </button>
          </div>
        </div>
        <div className="h-full bg-red-400 w-1/2"></div>
      </div>
      <div className="gap-12 flex flex-col">
        <MovieHolder title={'Trending Movies'} movies={movies}/>
        <MovieHolder title={'Top Rated'} movies={movies}/>
        <MovieHolder title={'Liked Movies'} movies={movies}/>
      </div>
    </div>
  );
}

export default Home;
