import express from 'express';
const router = express.Router();
import { registerValidation, loginValidation } from '../middleware/validation.js';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

router.post('/register',registerValidation, registerUser);
router.post('/login',loginValidation, loginUser);
router.post('/logout', logoutUser);


export default router