export const getTrailer = (videoData) => {
    let youtubeUrl = null;
    if (videoData.results && videoData.results.length > 0) {
      const trailer = videoData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        youtubeUrl = ytTrailer_url(trailer);
      }
      return youtubeUrl;
    }
  };