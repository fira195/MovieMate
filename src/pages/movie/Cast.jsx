import { useEffect, useState } from "react";
import PosterImage from "../../components/PosterImage";
import Skeleton from "./Skeleton";

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
export default Cast  