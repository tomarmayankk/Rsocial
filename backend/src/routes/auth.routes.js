import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup)
router.post('/signin', signup)
router.post('/logout', signup)

export default router;

