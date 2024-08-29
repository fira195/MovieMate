import Movie from "../models/movieModel.js";

// Fetch movie Detail
export const getDetail = async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMBD_KEY}`,
    },
  };
  const ombd_options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const fetchDetailParts = async (uri, options) => {
    const response = await fetch(uri, options);
    const ratings = await response.json();
    return ratings;
  };
  try {
    const { movieId } = req.params;
    console.log('fetching')
    //fetch imbd id from tmbd
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      options
    );
    const movie = await response.json();
    
   
    // Check if imdb_id exists before fetching from OMDb API
    if (!movie.imdb_id) throw Error("Movie not found");
    const [credits, similarMovies, videoData, ratings] = await Promise.all([
      // Fetch credits from TMDb API
      fetchDetailParts(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`,
        options
      ),
      //Fetch similar movies from TBDb
      fetchDetailParts(
        `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&page=1`,
        options
      ),
      // Fetch video information from TMDb (assuming video link is in trailers)
      fetchDetailParts(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?&language=en-US`,
        options
      ),
      //fetch ratings from ombd
      fetchDetailParts(
        `http://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${"90a5e067"}`,
        ombd_options
      ),
    ]);
    
   
    // Extract YouTube video ID from the first trailer (optional)
    const getTrailer = () => {
      let youtubeUrl = null;
      if (videoData.results && videoData.results.length > 0) {
        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
        return youtubeUrl;
      }
    };
   
    const youtubeUrl = getTrailer();
    res.status(200).json({
      data: { ...ratings, credits, youtubeUrl, similarMovies, movie },
    }); // Combine data with credits and video URL
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { searchTerm, currentPage } = req.params;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?&query=${searchTerm}&language=en-US&page=${currentPage}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMBD_KEY}`,
        }
      }
    );
    if (!response.ok) throw Error("COuldnt Fetch Movies...");
    const resJson=await response.json();
    const movies = resJson.results;
    let total_pages = resJson.total_pages;
    res.status(200).json({data: { movies: movies, total_pages: total_pages }});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.error("Error fetching data:", error);
  }
};
export const getTopRated = async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${
        Math.floor(Math.random() * 10) + 1
      }`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMBD_KEY}`,
        },
      }
    );
    const json = await response.json();
    res.status(200).json({data: json});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
};
////Correct this
export const getTreding = async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMBD_KEY}`,
        },
      }
    );
    const json = await response.json();
    res.status(200).json({data: json});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getGenreMovies = async (req, res) => {
  try {
    const { genreId } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
        Math.floor(Math.random() * 10) + 1
      }&sort_by=popularity.desc&with_genres=${genreId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMBD_KEY}`,
        },
      }
    );
    const json = await response.json();
    res.status(200).json({data: json});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getGenres = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMBD_KEY}`,
        },
      }
    );
    const json = await response.json();
    res.status(200).json(json);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
};
