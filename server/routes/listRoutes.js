import express from 'express'
import { addWatchlist, getPlaylists, getWatchlist, updateWatchlist } from '../controller/listController.js'

const router=express.Router()
// Fetch playlists
router.get('/playlist', getPlaylists)

router.get('/watchlist/:username', getWatchlist)
router.post('/watchlist', addWatchlist)
router.put('/watchlist/', updateWatchlist)
export default router