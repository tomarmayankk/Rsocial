import React, { useState, useEffect } from "react";
import { Delete, Heart, MessageCircle } from "lucide-react";
import { formatMessageTime } from "../lib/utils";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

const Post = ({ post }) => {
  const { fetchComments, comments, toggleLike } = usePostStore();
  const [commentOpen, setCommentOpen] = useState(false);
  const { setSelectedPost, deletePost } = usePostStore();
  const { authUser } = useAuthStore();
  const isLiked = post.likes.includes(authUser._id);

  // Fetch comments properly
  useEffect(() => {
    const loadComments = async () => {
      await fetchComments(post._id);
    };
    loadComments();
  }, [fetchComments, post._id]);

  return (
    <div className="bg-white w-full rounded-lg border border-gray-300 p-2">
      {/* User Info */}
      <div className="flex gap-2">
        <img
          src={post?.userId?.profilePic || "./avatar.png"}
          alt=""
          className="w-6 h-6 rounded-full"
        />
        <div>
          <h1 className="text-sm font-bold">{post?.userId?.fullName}</h1>
          <p className="text-xs text-gray-500">{formatMessageTime(post.createdAt)}</p>
        </div>
        {post?.userId?._id === authUser._id && (
          <div onClick={() => setSelectedPost(post)}>
            <Delete onClick={() => deletePost(post._id)} />
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-2">
        <p className="text-sm">{post.text}</p>
        {post?.image && (
          <img
            src={post.image}
            alt="Post"
            className="rounded-lg w-full max-h-60 object-cover mt-2"
          />
        )}
      </div>

      {/* Like & Comment Buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button
          className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
          onClick={() => toggleLike(post._id)}
        >
          <Heart size={16} fill={isLiked ? "red" : "none"} />
          <span>{post.likes.length}</span>
        </button>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <MessageCircle size={16} />
        </button>
      </div>

      {/* Comments Section */}
      {commentOpen && (
        <div className="mt-2">
          <CommentInput postId={post._id} />
          <Comments comments={comments[post._id] || []} />
        </div>
      )}
    </div>
  );
};

export default Post;