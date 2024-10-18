import { useState } from "react";

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
  
export default Rating  