import { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetch2.0";
import Skeleton from "../Skeleton";
import NameDescriptionCard from "./NameDescriptionCard";
import PlaylistCard from "./PlaylistCard";
import { btnClassName } from "../../../utils/css";

function PlaylistBody({ username }) {
  const {  error, loading, fetchData } = useFetchData();
    const [playlist, setPlaylist] = useState([]);
    
    //function to fetch all the playlists of a user
    const fetchPlaylists = async() =>{
      const response = await fetchData('GET',`/lists/playlist/${username}/protected`);
      setPlaylist(response?.data?.playlists)
    }

    useEffect(() => {
      fetchPlaylists()
    }, [username]);
    


    //changes the visibility of add playlist card
    const [addPlaylistState, setAddPlaylistState] = useState(false);
    const addPlaylistStateHandler = () => setAddPlaylistState((prev) => !prev);
    

    const [cardView, setCardView] = useState(null);
    const cardViewHandler = () => {
      setCardView((prev) => !prev);
    };
    


    //changes the visiblity of the playlist if clicked
    const [expand, setExpand] = useState(null);
    const expandHandler = (playlist_id) => {
      setExpand(expand === playlist_id ? null : playlist_id); 
    };


    const renderMovies = () => {
      console.log(playlist)
      if (loading)
        return Array.from({ length: 5 }).map((item) => {
          return <Skeleton />;
        });
      else if (error)
        return (
          <div className="font-bold text-center text-xl space-y-2">
            <p> Coudn't Fetch Data Try Reloading the page</p>
            <button className={btnClassName} onClick={fetchPlaylists}>
              Retry
            </button>
          </div>
        );
      else if (playlist?.length <= 0)
        return (
          <div className="font-bold text-center text-xl">No Movies Found</div>
        );
      else {
        return playlist?.map((item, key) => {
          return (
            <PlaylistCard
              fetchPlaylists={fetchPlaylists}
              cardView={cardView}
              expand={expand}
              cardViewHandler={cardViewHandler}
              expandHandler={expandHandler}
              key={key}
              playlist={item}
            />
          );
        });
      }
    };



    return (
      <div className="flex gap-10 flex-col">
        <div className="flex gap-4 items-center font-semibold my-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className=" text-xl">{`PLAYLISTS YOU HAVE: ${playlist?.length || 0}`}</h1>
        </div>
        <div className="flex justify-center">
          {" "}
          <img
            src="/add.png"
            onClick={addPlaylistStateHandler}
            className="w-14 hover:rotate-90 active:scale-90 cursor-pointer transition-all duration-200"
            alt=""
          />{" "}
        </div>
        {addPlaylistState && (
          <NameDescriptionCard
          fetchPlaylists={fetchPlaylists}
            addPlaylistStateHandler={addPlaylistStateHandler}
            username={username}
          />
        )}
        {renderMovies()}
      </div>
    );
  }
  export default PlaylistBody