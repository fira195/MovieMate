import mongoose from "mongoose";
import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";
import { persistMovie } from "../utils/persistMovie.js";
import movieModel from "../models/movieModel.js";
import { CustomError } from "../utils/customError.js";

// Function to get all playlists (currently placeholder)

export const createPlaylist = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { name, description } = req.body;

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    const newPlaylist = {
      name,
      description,
      movies: [],
    };

    user.playlists.push(newPlaylist);
    await user.save();

    res.status(201).json({data:{ message: "Playlist created successfully", playlist: newPlaylist }});
  } catch (error) {
    next(error)
  }
};
export const getPlaylists = async (req, res,next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    res.status(200).json({data:{ playlists: user.playlists }});
  } catch (error) {
        next(error)

  }
};
export const getPlaylist = async (req, res, next) => {
  try {
    const { username, playlistID } = req.params;

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    const playlist = user.playlists.id(playlistID);
    if (!user) throw new CustomError('PLaylist Not Found', 404)

    const movies=[]
    await Promise.all(
      playlist.movies.map(async (movieId) => {
       const movie =await Movie.findOne({tmbdId: movieId});
       movies.push(movie)
     })
   );

    res.status(200).json({data:{ data: movies, playlist }});
  } catch (error) {
        next(error)

  }
};
export const updatePlaylist = async (req, res, next) => {
  console.log('asdf')
  try {
    const { username, playlistID } = req.params;
    const { name, description } = req.body;

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    const playlist = user.playlists.id(playlistID);
    if (!user) throw new CustomError('Playlist Not Found', 404)

    if (name) playlist.name=name
    if (description) playlist.description=description
    await user.save();

    res.status(200).json({data:{ message: "Playlist updated successfully", playlist }});
  } catch (error) {
        next(error)

  }
};
export const deletePlaylist = async (req, res,next) => {
  try {
    const { username, playlistID } = req.params;

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    const playlist = user.playlists.id(playlistID);
    if (!user) throw new CustomError('Playlist Not Found', 404)

    playlist.remove();
    await user.save();

    res.status(200).json({data:{ message: "Playlist deleted successfully"} });
  } catch (error) {
    console.error(error);
    res.status(500).json({data:{ message: "Server Error"} });
  }
};
export const addToPlaylist = async (req, res, next) => {
  try {
    const { username, playlistID } = req.params;
    const movie=req.body

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    const playlist = user.playlists.id(playlistID);
    if (!user) throw new CustomError('PLAYlist Not Found', 404)

    if (!playlist.movies.includes(movie.tmbdId)) {
      
    const movieStored = await persistMovie(movie);
    if (!movieStored) throw new CustomError('Couldn\'t persist movie', 500);
      playlist.movies.push({movieId:movie.tmbdId, posterPath: movie.posterPath});

      await user.save();
      res.status(200).json({data:{ message: "Movie added to playlist", playlist }});
    } else {
      res.status(400).json({data:{ message: "Movie already in playlist" }});
    }
  } catch (error) {
        next(error)

  }
};
export const removeFromPlaylist = async (req, res ,next) => {
  try {
     const { username, playlistID, movieId } = req.params;

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)

    const playlist = user.playlists.id(playlistID);
    if (!user) throw new CustomError('PLalist Not Found', 404)

    const movieIndex = playlist.movies.findIndex((movie) => movie.movieId.toString() === movieId.toString());
    if (movieIndex > -1) {
      playlist.movies.splice(movieIndex, 1);
      await user.save();
      res.status(200).json({data:{ message: "Movie removed from playlist", playlist }});
    } else {
      res.status(400).json({data:{ message: "Movie not found in playlist" }});
    }
  } catch (error) {
    next(error)

  }
};



// Function to get a user's watchlist
export const getList = async (req, res, routeList,next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({data:{ message: "User not found"} });
    }

    const list = user[routeList];

    const movies=[]
     await Promise.all(
      list.map(async (movieId) => {
        const movie =await Movie.findOne({tmbdId: movieId});
        movies.push(movie)
      })
    );
    res.status(200).json({ data: {results: movies} });
  } catch (error) {
    next(error)

  }
};
// Function to add a movie to the user's watchlist
export const  addToList = async (req, res, routeList ,next) => {
  try {
    const { username } = req.params;
    const movie=req.body

    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)


    const movieStored = await persistMovie(movie);
    if (!movieStored) throw new CustomError('Couldn\'t persist movie');

    if (user[routeList].includes(movie.tmbdId)) return res.status(203).json({data:{message: 'Already Added'}})
    user[routeList].push(movie.tmbdId);
    await user.save();

    res.status(201).json({data:{ message: 'Successfully added to watchlist' }});
  } catch (e) {
    next(e)

  }
};
// Function to update a user's watchlist (currently placeholder)
export const updateList = async (req, res, routeList,next) => {
  try {
    const { username } = req.params;
    const { movieId } = req.body; // Assuming movieId is sent in the request body

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) throw new CustomError('User Not Found', 404)


    // Remove the movieId from the watchedMovies array
    user[routeList]  =await user[routeList].filter(id => {
      return id  !== parseInt(movieId)
    });
    // Save the updated user document
    await user.save();
    res.status(200).json({data:{ message: "Movie removed from watched movies" }});
  } catch (e) {
    next(e)
  }
};


