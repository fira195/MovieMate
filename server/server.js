import express from 'express';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import listRoutes from './routes/listRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors'
import { errorHandler } from './middlewar/errorHandling.js';
import { authenticate } from './middlewar/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
    
}));
app.use(express.json());
app.use(cookieParser());
app.use(authenticate)

// Connect to MongoDB
connectDB()

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/lists', listRoutes);
app.use('*', (req,res)=>{
  res.status(404).json({
    data: {message: 'Requested Resource not found'}
  })
});

app.use(errorHandler)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
