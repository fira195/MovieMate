import mongoose from "mongoose";
import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";
import { persistMovie } from "../utils/persistMovie.js";
import movieModel from "../models/movieModel.js";

// Function to get all playlists (currently placeholder)

export const createPlaylist = async (req, res) => {
  try {
    const { username } = req.params;
    const { playlistName } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPlaylist = {
      name: playlistName,
      movies: [],
    };

    user.playlists.push(newPlaylist);
    await user.save();

    res.status(201).json({ message: "Playlist created successfully", playlist: newPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getPlaylists = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ playlists: user.playlists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getPlaylist = async (req, res) => {
  try {
    const { username, playlistID } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const playlist = user.playlists.id(playlistID);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    const movies=[]
    await Promise.all(
      playlist.movies.map(async (movieId) => {
       const movie =await Movie.findOne({tmbdId: movieId});
       movies.push(movie)
     })
   );

    res.status(200).json({ data: movies, playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updatePlaylist = async (req, res) => {
  try {
    const { username, playlistID } = req.params;
    const { playlistName } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const playlist = user.playlists.id(playlistID);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    playlist.name = playlistName || playlist.name;
    await user.save();

    res.status(200).json({ message: "Playlist updated successfully", playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deletePlaylist = async (req, res) => {
  try {
    const { username, playlistID } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const playlist = user.playlists.id(playlistID);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    playlist.remove();
    await user.save();

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const addToPlaylist = async (req, res) => {
  try {
    const { username, playlistID } = req.params;
    const movie=req.body

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const playlist = user.playlists.id(playlistID);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    if (!playlist.movies.includes(movie.tmbdId)) {
      
    const movieStored = await persistMovie(movie);
    if (!movieStored) throw new Error('Couldn\'t persist movie');
      playlist.movies.push(movie.tmbdId);
      await user.save();
      res.status(200).json({ message: "Movie added to playlist", playlist });
    } else {
      res.status(400).json({ message: "Movie already in playlist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const removeFromPlaylist = async (req, res) => {
  try {
    const { username, playlistID, movieId } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const playlist = user.playlists.id(playlistID);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    const movieIndex = playlist.movies.indexOf(movieId);
    if (movieIndex > -1) {
      playlist.movies.splice(movieIndex, 1);
      await user.save();
      res.status(200).json({ message: "Movie removed from playlist", playlist });
    } else {
      res.status(400).json({ message: "Movie not found in playlist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Function to get a user's watchlist
export const getList = async (req, res, routeList) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// Function to add a movie to the user's watchlist
export const addToList = async (req, res, routeList) => {
  try {
    const { username } = req.params;
    const movie=req.body

    console.log(movie)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({data:{ message: "User not found" }});
    }

    const movieStored = await persistMovie(movie);
    if (!movieStored) throw new Error('Couldn\'t persist movie');

    if (user[routeList].includes(movie.tmbdId)) return res.status(203).json({data:{message: 'Already Added'}})
    user[routeList].push(movie.tmbdId);
    await user.save();

    res.status(201).json({data:{ message: 'Successfully added to watchlist' }});
  } catch (e) {
    console.error(e);
    res.status(500).json({data:{ message: "Server Error" }});
  }
};
// Function to update a user's watchlist (currently placeholder)
export const updateList = async (req, res, routeList) => {
  try {
    const { username } = req.params;
    const { movieId } = req.body; // Assuming movieId is sent in the request body

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({data:{ message: "User not found" }});
    }

    // Remove the movieId from the watchedMovies array
    user[routeList]  =await user[routeList].filter(id => {
      return id  !== parseInt(movieId)
    });
    // Save the updated user document
    await user.save();

    res.status(200).json({data:{ message: "Movie removed from watched movies" }});
  } catch (e) {
    console.log(e);
    res.status(500).json({data:{ message: "Server error" }});
  }
};


