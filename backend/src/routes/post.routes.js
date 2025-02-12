import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createPost, deletePost, getAllPosts } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/create-posts/:id', protectRoute, createPost);
router.get('/get-posts', protectRoute, getAllPosts);
router.delete('/delete-posts/:postId', protectRoute, deletePost);


export default router;