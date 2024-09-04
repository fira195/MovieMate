import express from 'express';
import { register, login,profile, refreshToken, editProfile, logout } from '../controller/userController.js';
import { authenticate } from '../middlewar/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/profile', authenticate, profile);
router.post('/update/:username', editProfile);
//router.post('/profile',authenticate, login);

export default router;  
