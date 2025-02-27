import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createComment, createPost, deletePost, getAllComments, getAllPosts, toggleLike } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/create-posts/:id', protectRoute, createPost);
router.get('/get-posts', protectRoute, getAllPosts);
router.delete('/delete-posts/:postId', protectRoute, deletePost);
router.post('/create-comments/:userId/:postId', protectRoute, createComment);
router.get('/get-comments/:postId', protectRoute, getAllComments);
router.put("/toggle-like/:postId",protectRoute, toggleLike);


export default router;