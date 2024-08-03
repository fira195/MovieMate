import { useEffect, useState } from 'react';
import MovieHolder from '../components/MovieHolder'
function Discover() {
  const genre=['Action', 'Comedy', 'Thriller', 'SciFi', 'Drama','Comedy', 'Thriller', 'SciFi', 'Drama',]
  const movie = [
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watchlist",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watched",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Watchlist",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
    {
      tag: "Liked",
      name: "Avatar",
      rotten_tomatoes: "9.8",
      imbd: "9.5",
      year: "2003",
    },
  ];
  const [title,setTitle]=useState('Action')

  const [movies, setMovies]=useState({})
  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=44ac81e55da40ee5b9c4b83c785597ec&with_genres=28',{
      method: 'GET'
    })
    .then((res)=>res.json())
    .then((res)=>console.log(res))
    .catch(e=>console.log(e))
  },[])
  return (
    <div className="min-h-screen  bg-main relative ">
      <div className=" h-52 absolute w-full z-0 flex items-center">
        <p className="font-bold text-2xl ml-16">Discover</p>
      </div>
      <div className="relative z-10 pl-10 flex flex-wrap gap-8 pt-60 justify-start"  >
        {genre.map((item,key)=>{
          return <div key={key} onClick={()=>setTitle(item)} className="flex flex-col flex-shrink-0 font-semibold hover:scale-105 active:scale-95 transition duration-300 cursor-pointer justify-end w-44 h-28 p-4 rounded-xl border-2 border-black">{item}</div>
        })}
      </div>   
      <div className='pl-4 space-y-10 mt-10'>
      <MovieHolder title={title} movies={movie}/> 
      <MovieHolder title={'Featured'} movies={movie}/> 
      <MovieHolder title={'Top Rated'} movies={movie}/> 
      <MovieHolder title={'Trending'} movies={movie}/> 
      </div>
    </div>
  );
}

export default Discover;
