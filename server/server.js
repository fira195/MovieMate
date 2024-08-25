import express from 'express';
import userRoutes from './routes/userRoutes.js';
//import movieRoutes from './routes/movieRoutes.js';
//import playlistRoutes from './routes/playlistRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB()

// Use Routes
app.use('/api/users', userRoutes);
//app.use('/api/movies', movieRoutes);
//app.use('/api/playlists', playlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
