import { useRef, useState } from "react";
import Loading from "./helper";


function PosterImage({ src, alt, width }) {
  
function Skeleton(){
  return(
<div className="bg-gray-500 h-full w-full skeleton-shimmer"></div>
  )
}
    const [imageStatus, setImageStatus] = useState("loading");
  
    const handleImageLoad = () => {
      setImageStatus("loaded");
    };
  
    const handleImageError = () => {
      setImageStatus("error");
    }; 
    return (
      <div className={`w-fit h-full flex items-center justify-center`}>
        {imageStatus === "loading" && (
            <Skeleton />
        )}
        {imageStatus === "error" && (
          <div className="text-white text-center absolute">
            <p>Image not found</p>
          </div>
        )}
        <img
          src={src}
          alt={alt}
           onLoad={handleImageLoad}
          onError={handleImageError}
          className={`${width} object-cover ${
            imageStatus === "loaded" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        />
      </div> 
    );
  }
  export default PosterImage