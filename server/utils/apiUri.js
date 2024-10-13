
const tmbd_base_url=`https://api.themoviedb.org/3/movie/`
export const ombd_base_url=(movie)=>`http://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${"90a5e067"}`
export const ytTrailer_url=(trailer)=>`https://www.youtube.com/embed/${trailer.key}`

export const tmbd_endpoints={
    movieDetails: (movieId)=>`${tmbd_base_url}${movieId}`,
    movieCredits: (movieId)=>`${tmbd_base_url}movie/${movieId}/credits?language=en-US`,
    movieRecommendations: (movieId)=>`${tmbd_base_url}movie/${movieId}/recommendations?language=en-US&page=1`,
    movieVideos:(movieId)=> `${tmbd_base_url}/${movieId}videos?&language=en-US`,
}
export const tmbd_options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMBD_KEY}`,
    },
  };
  export const ombd_options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.OMDB_API_KEY}`,
    },
  };