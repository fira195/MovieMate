import express from "express"
import {login} from './controller/userAuth.js'
import createUser from './controller/userAuth.js'
import connectDB from "./config/config.js"
import dotenv from 'dotenv'

const app = express();
app.use(express.json())
dotenv.config()

app.post("/create", createUser);
app.post("/login", login);

connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });