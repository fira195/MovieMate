import Movie from "../models/movieModel.js";
import {
  ombd_base_url,
  ombd_options,
  tmbd_endpoints,
  tmbd_options,
  ytTrailer_url,
} from "../utils/apiUri.js";
import { fetchMovieDetails } from "../utils/fetchMovieDetails.js";
import { getTrailer } from "../utils/getYtTrailer.js";

// Fetch movie Detail
export const getDetail = async (req, res, next) => {

  try {
    const { movieId } = req.params;

    //fetch imbd id from tmbd
    const movieDetailsUrl = tmbd_endpoints.movieDetails(movieId);
    const response = await fetch(movieDetailsUrl, tmbd_options, next);
    const movie = await response.json();
    
    // Check if imdb_id exists before fetching from OMDb API
    if (!movie.imdb_id) throw Error("Movie not found");
    
    const movieCreditsUrl=tmbd_endpoints.movieCredits(movieId)
    const movieRecommendationUrl=tmbd_endpoints.movieRecommendations(movieId)
    const movieVideoUrl=tmbd_endpoints.movieVideos(movieId)
    const ombdUrl=ombd_base_url(movie)
    const [credits, similarMovies, videoData, ratings] = await Promise.all([
      // Fetch credits from TMDb API
      fetchMovieDetails(movieCreditsUrl, tmbd_options, next),
      //Fetch similar movies from TBDb
      fetchMovieDetails(movieRecommendationUrl, tmbd_options, next),
      // Fetch video information from TMDb (assuming video link is in trailers)
      fetchMovieDetails(movieVideoUrl, tmbd_options, next),
      //fetch ratings from ombd
      fetchMovieDetails(ombdUrl, ombd_options, next),
    ]);
    
    // Extract YouTube video ID from the first trailer (optional)
    
    console.log(similarMovies)
    const youtubeUrl = getTrailer(videoData);
    res.status(200).json({
      data: {
        ...ratings,
        credits,
        youtubeUrl,
        similarMovies,
        movie,
        tmbdId: movieId,
      },
    }); // Combine data with credits and video URL
  } catch (error) {
    next(error);
  }
};

export const searchMovie = async (req, res, next) => {
  try {
    const { searchTerm, currentPage } = req.params;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?&query=${searchTerm}&language=en-US&page=${currentPage}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMBD_KEY}`,
        },
      }
    );
    if (!response.ok) throw Error("COuldnt Fetch Movies...");
    const resJson = await response.json();
    const movies = resJson.results;
    let total_pages = resJson.total_pages;
    res
      .status(200)
      .json({ data: { movies: movies, total_pages: total_pages } });
  } catch (error) {
    next(error);
  }
};
export const getTopRated = async (req, res, next) => {
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
    res.status(200).json({ data: json });
  } catch (e) {
    next(e);
  }
};
////Correct this
export const getTreding = async (req, res, next) => {
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
    res.status(200).json({ data: json });
  } catch (e) {
    next(e);
  }
};

export const getGenreMovies = async (req, res, next) => {
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
    res.status(200).json({ data: json });
  } catch (e) {
    next(e);
  }
};
export const getGenres = async (req, res, next) => {
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
    next(e);
  }
};
