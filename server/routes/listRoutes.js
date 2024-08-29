import express from 'express'
import { addToList, getPlaylists, getList, updateList, createPlaylist, getPlaylist, updatePlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist } from '../controller/listController.js'

const router=express.Router()
// Fetch playlists
router.get('/playlist', getPlaylists)

const createRouteHandler = (handler, routeList) => {
    return (req, res) => handler(req, res, routeList);
  };
  
  router.get('/likedMovies/:username', createRouteHandler(getList, 'likedMovies'));
  router.post('/likedMovies/:username', createRouteHandler(addToList, 'likedMovies'));
  router.delete('/likedMovies/:username', createRouteHandler(updateList, 'likedMovies'));
  
  router.get('/watchlist/:username', createRouteHandler(getList, 'watchlist'));
  router.post('/watchlist/:username', createRouteHandler(addToList, 'watchlist'));
  router.delete('/watchlist/:username', createRouteHandler(updateList, 'watchlist'));
  
  router.get('/watchedMovies/:username', createRouteHandler(getList, 'watchedMovies'));
  router.post('/watchedMovies/:username', createRouteHandler(addToList, 'watchedMovies'));
  router.delete('/watchedMovies/:username', createRouteHandler(updateList, 'watchedMovies'));

  router.post('/playlist/:username/create', createPlaylist)
  router.get('/playlist/:username', getPlaylists)
  router.get('/playlist/:username/:playlistID', getPlaylist)
  router.put('/playlist/:username/:playlistID', updatePlaylist) 
  router.delete('/playlist/:username/:playlistID', deletePlaylist)
  router.post('/playlist/:username/:playlistID/:movieId', addToPlaylist)
  router.delete('/playlist/:username/:playlistID/:movieId', removeFromPlaylist)
  
export default router