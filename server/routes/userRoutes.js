import express from 'express';
import { register, login,profile, refreshToken, editProfile, logout, forgotPassword, resetPassword } from '../controller/userController.js';
import { authenticate } from '../middlewar/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

router.post('/logout/protected', logout);
router.post ('/forgot-password/:username', forgotPassword);
router.post('/reset-password/:username/:token', resetPassword);
router.post('/profile/protected',  profile);
router.post('/update/:username/protected', editProfile);
//router.post('/profile',authenticate, login);

export default router;  
