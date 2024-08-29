import movieModel from "../models/movieModel.js";

export const persistMovie = async (movie) => {
  try {
    const movieFound = await movieModel.findOne({ tmbdId: movie.tmbdId });
    if (movieFound) {
      console.log('Movie already exists');
      return true;
    }
    
    const res = await movieModel.create({ ...movie });
    return res._id ? true : false;
  } catch (error) {
    console.error('Error persisting movie:', error);
    return false;
  }
};
