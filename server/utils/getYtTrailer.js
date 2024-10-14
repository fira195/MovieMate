import { ytTrailer_url } from "./apiUri.js";
export const getTrailer = async(videoData) => {
    let youtubeUrl = null;
    if (videoData.results && videoData.results.length > 0) {
      const trailer =await videoData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        console.log(trailer)
        youtubeUrl = ytTrailer_url(trailer);
      }
      return youtubeUrl;
    }
  };


  ['/api/users/logout', 'forgot-password/']