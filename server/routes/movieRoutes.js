import express from 'express'
import { getGenres } from '../controller/movieController.js'

const router=express.Router()
// Fetch playlists
router.get('/genre', getGenres)

export default router