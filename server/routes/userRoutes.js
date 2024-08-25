import express from 'express';
import { register, login } from '../controller/userAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
