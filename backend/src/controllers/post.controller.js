import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js"


export const createPost = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: userId} = req.params;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newPost = new Post({
            userId,
            text,
            image: imageUrl,
        })
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log( "error in send Post controller", error.message);
        res.status(500).json({message: "internal server error"});
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "fullName profilePic email") // Populate user details
            .populate({
                path: "comments",
                model: "Comment", // Ensure correct reference
                populate: { path: "userId", select: "name email" }
            })
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Delete all associated comments
        await Comment.deleteMany({ postId });

        // Delete the post
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { userId, postId } = req.params; // Extract from params

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Create a new comment
        const newComment = new Comment({
            text,
            userId,
            postId,
        });

        // Save the comment
        await newComment.save();

        // Add comment reference to the post
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const { postId } = req.params; // Get postId from request params

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Fetch comments related to the post and populate user details
        const comments = await Comment.find({ postId })
            .populate("userId", "fullName profilePic email") // Populate user details
            .sort({ createdAt: -1 }) // Sort by newest first
            .exec(); // Explicitly execute query


        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const toggleLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json({ likes: post.likes });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



