
import mongoose from "mongoose";
import { CustomError } from "../utils/customError.js";
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      throw new CustomError(error)
    }
  };
export default connectDB