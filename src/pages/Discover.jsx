import { useEffect, useState } from "react";
import MovieHolder from "../components/MovieHolder";
function Discover() {
  const [genres,setGenres]=useState([]);
  const [title, setTitle] = useState({id: 28, name: 'Action'});

  const data = [
    {
      title: `${title.name}`,
      options: {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc",
        },
      },
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${Math.floor(Math.random() * 5) + 1}&sort_by=popularity.desc&with_genres=${title.id}`,
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

  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=en-US',data[0].options)
    .then(res=>res.json())
    .then(res=>setGenres(res.genres))
    .catch(e=>console.log(e))
  },[])
  console.log(data[0].url)
  return (  
    <div className="min-h-screen  bg-main relative ">
      <div className=" h-52 absolute w-full z-0 flex items-center">
        <p className="font-bold text-2xl ml-16">Discover</p>
      </div>
      <div className="relative z-10 pl-10 flex flex-wrap gap-8 pt-60 justify-start">
        {genres.map((item, key) => {
          return (
            <div
              key={key}
              onClick={() => setTitle(item)}
              className="flex flex-col flex-shrink-0 font-semibold hover:scale-105 active:scale-95 transition duration-300 cursor-pointer justify-end w-40 h-20 p-4 rounded-xl border-2 border-black"
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="pl-4 space-y-10 mt-10">
        {data.map((item, indx) => (
          <MovieHolder key={indx} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Discover;
