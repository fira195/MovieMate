import express from 'express'
import { getDetail, getGenreMovies, getGenres, getTopRated, getTreding, searchMovie } from '../controller/movieController.js'

const router=express.Router()
// Fetch playlists
router.get('/genre', getGenres)
router.get('/top-rated', getTopRated)
router.get('/trending', getTreding)
router.post('/search/:searchTerm/:currentPage', searchMovie)
router.get('/movie/:movieId', getDetail)
router.get('/genre-movies/:genreId', getGenreMovies)

export default router