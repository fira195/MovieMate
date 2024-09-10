import express from 'express';
import { register, login,profile, refreshToken, editProfile, logout, forgotPassword, resetPassword } from '../controller/userController.js';
import { authenticate } from '../middlewar/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',authenticate, logout);
router.post('/refresh-token', refreshToken);
router.post ('/forgot-password/:username',authenticate, forgotPassword);
router.post('/reset-password/:username/:token',authenticate, resetPassword);
router.post('/profile', authenticate, profile);
router.post('/update/:username',authenticate, editProfile);
//router.post('/profile',authenticate, login);

export default router;  
