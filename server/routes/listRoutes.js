import express from 'express'
import { addToList, getPlaylists, getList, updateList, createPlaylist, getPlaylist, updatePlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist } from '../controller/listController.js'
import { authenticate } from '../middlewar/authMiddleware.js';

const router=express.Router()
// Fetch playlists
router.get('/playlist', getPlaylists)

const createRouteHandler = (controller, routeList) => {
    return (req, res) => controller(req, res, routeList);
  };
  
  router.get('/likedMovies/:username/protected',createRouteHandler(getList, 'likedMovies'));
  router.post('/likedMovies/:username/protected', createRouteHandler(addToList, 'likedMovies'));
  router.delete('/likedMovies/:username/protected', createRouteHandler(updateList, 'likedMovies'));
  
  router.get('/watchlist/:username/protected', createRouteHandler(getList, 'watchlist'));
  router.post('/watchlist/:username/protected', createRouteHandler(addToList, 'watchlist'));
  router.delete('/watchlist/:username/protected', createRouteHandler(updateList, 'watchlist'));
  
  router.get('/watchedMovies/:username/protected', createRouteHandler(getList, 'watchedMovies'));
  router.post('/watchedMovies/:username/protected', createRouteHandler(addToList, 'watchedMovies'));
  router.delete('/watchedMovies/:username/protected', createRouteHandler(updateList, 'watchedMovies'));

  router.post('/playlist/:username/protected', createPlaylist)
  router.get('/playlist/:username/protected', getPlaylists)
  router.get('/playlist/:username/:playlistID/protected', getPlaylist)
  router.put('/playlist/:username/:playlistID/protected', updatePlaylist) 
  router.delete('/playlist/:username/:playlistID/protected', deletePlaylist)
  router.post('/playlist/:username/:playlistID/:movieId/protected', addToPlaylist)
  router.delete('/playlist/:username/:playlistID/:movieId/protected',removeFromPlaylist)
  
export default router