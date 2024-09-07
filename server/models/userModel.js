import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  bio: { type: String },
  password: {type: String, required: true},
  watchlist: [{ type: Number, ref: "Movie" }],
  likedMovies: [{ type: Number, ref: "Movie" }],
  watchedMovies: [{ type: Number, ref: "Movie" }],
  playlists: [{ 
    playlistId: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    description: {type: String},
    highlights: [{type: String}],
    movies: [{
      movieId: { type: Number, ref: "Movie" },  // Reference to the Movie ID (Number)
      posterPath: { type: String }              // String property for the movie title
    }]
   }],
  reviews: [{
    reviewId: mongoose.Schema.ObjectId,
    movieId: {type: Number, ref: 'Movie'},
    createdAt: {type: Date, default: Date.now},
    rating: {type: Number},
    review: { type: String }
  }],
});

export default mongoose.model("User", userSchema);
