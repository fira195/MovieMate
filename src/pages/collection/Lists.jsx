import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetch2.0";
import Skeleton from "./Skeleton";
import SmallMovieCard from '../../components/SmallMovieCard'

function Lists({ url, username, openTitle }) {
    const { error, loading, fetchData } = useFetchData();
    const [response, setresponse] = useState([]);
  
    const asyncFetchMovieLists=async()=>{
    const response=await fetchData('GET',`/lists/${url}/${username}/protected`);
    setresponse(response?.data)
    }
    useEffect(() => {
        asyncFetchMovieLists()
    }, [url]);  
  
    const renderMovies = () => {
      if (loading)
        return Array.from({ length: 5 }).map((item) => {
          return <Skeleton/>;
        });
      else if (error)
        return (
          <div className="font-bold text-center text-xl">
            Coudn't Fetch Data Try Reloading the page
          </div>
        );
      else if (response?.results?.length <= 0)
        return (
          <div className="font-bold text-center text-xl">No Movies Found</div>
        );
      else {
        return (
          response?.results?.map((item, key) => (
            <SmallMovieCard
              key={key}
              {...item}
              url={url}
              username={username}
              updateList={asyncFetchMovieLists}
            />
          ))
        );
      }
    };
    return (
      <div>
        <div className="flex gap-4 items-center font-semibold my-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">{`${openTitle}: ${response?.results?.length || 0}`}</h1>
        </div>
        <div>
          <div className="flex flex-col gap-6 ">{renderMovies()}</div>
        </div>
      </div>
    );
  }
export default Lists