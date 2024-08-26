import mongoose from "mongoose"
import User from "../models/userModel.js"
import Movie from "../models/movieModel.js"

export const getPlaylists = async (req, res) => {
  const db=User.find()
  console.log(db)
  res.send('asdf')
}
export const getWatchlist = async (req, res) =>{
  const {username}=req.params
  const user=await User.findOne({username})
  const watchlist=user.watchlist
  
  const movies=[]
  watchlist.forEach(async(movieId)=>{
    const movie=await Movie.findOne(movieId)
    movies.push(movie)
  })

  console.log(movies)
  res.json('user')
}
export const addWatchlist = async (req, res) =>{
  const {username}=req.params
  const {movieId}= req.body
  const user=await User.findOne({username})

}
export const updateWatchlist = async (req, res) =>{
  console.log('added')
}
