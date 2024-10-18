import Skeleton from "./Skeleton";

function Trailer({ youtubeUrl }) {
    return (
      <div className="shadow-xl p-3">
        <div className="flex gap-4 items-center font-semibold mb-6">
          <div className="bg-accent h-10 w-2 ml-2"></div>
          <h1 className="text-xl">Trailer</h1>
        </div>
        <div className="w-full flex justify-center">
          {youtubeUrl ? (
            <iframe
              width="1000"
              height="500"
              src={youtubeUrl}
              title="How To Embed YouTube Videos in React / Gatsby (and make them Responsive)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    );
  }
export default Trailer  