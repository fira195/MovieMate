import express from 'express'
import { addToList, getPlaylists, getList, updateList, createPlaylist, getPlaylist, updatePlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist } from '../controller/listController.js'
import { authenticate } from '../middlewar/authMiddleware.js';

const router=express.Router()
// Fetch playlists
router.get('/playlist', getPlaylists)

const createRouteHandler = (handler, routeList) => {
    return (req, res) => handler(req, res, routeList);
  };
  
  router.get('/likedMovies/:username',authenticate, createRouteHandler(getList, 'likedMovies'));
  router.post('/likedMovies/:username',authenticate,  createRouteHandler(addToList, 'likedMovies'));
  router.delete('/likedMovies/:username',authenticate,  createRouteHandler(updateList, 'likedMovies'));
  
  router.get('/watchlist/:username',authenticate,  createRouteHandler(getList, 'watchlist'));
  router.post('/watchlist/:username',authenticate,  createRouteHandler(addToList, 'watchlist'));
  router.delete('/watchlist/:username',authenticate,  createRouteHandler(updateList, 'watchlist'));
  
  router.get('/watchedMovies/:username',authenticate,  createRouteHandler(getList, 'watchedMovies'));
  router.post('/watchedMovies/:username',authenticate,  createRouteHandler(addToList, 'watchedMovies'));
  router.delete('/watchedMovies/:username',authenticate,  createRouteHandler(updateList, 'watchedMovies'));

  router.post('/playlist/:username',authenticate,  createPlaylist)
  router.get('/playlist/:username',authenticate,  getPlaylists)
  router.get('/playlist/:username/:playlistID', authenticate, getPlaylist)
  router.put('/playlist/:username/:playlistID',authenticate,  updatePlaylist) 
  router.delete('/playlist/:username/:playlistID',authenticate,  deletePlaylist)
  router.post('/playlist/:username/:playlistID/:movieId', authenticate, addToPlaylist)
  router.delete('/playlist/:username/:playlistID/:movieId',authenticate, removeFromPlaylist)
  
export default router