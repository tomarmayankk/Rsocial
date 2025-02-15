import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { updateProfilePic } from '../controllers/user.controller.js';
const router = express.Router();

router.put('/update-pfp', protectRoute, updateProfilePic);

export default router;
