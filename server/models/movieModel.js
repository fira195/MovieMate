import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  tmbdId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  releaseDate:{type: Date},
  ratings:{
    imbdRating: {type: Number},
    rottenTomatoes: {type: String}
  }
  // Add other movie properties as needed
});

export default mongoose.model('Movie', movieSchema);
