import React, { useState, useEffect } from "react";
import {  Heart, MessageCircle, Trash } from "lucide-react";
import { formatMessageDate, formatMessageTime } from "../lib/utils";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

const Post = ({ post }) => {
  const { fetchComments, comments, toggleLike } = usePostStore();
  const [commentOpen, setCommentOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  const handleDelete = () => {
    deletePost(post._id);
    setShowDeleteDialog(false);
  };

  return (
    <div className="bg-white w-full rounded-lg border border-gray-300" style={{padding: "10px"}}>
      {/* User Info */}
      <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <img
          src={post?.userId?.profilePic || "./avatar.png"}
          alt=""
          className="w-6 h-6 rounded-full"
        />
        <div>
          <h1 className="text-sm font-bold">{post?.userId?.fullName}</h1>
          {
            post.userId._id == authUser._id ? (
              <span className="text-xs text-gray-500">You</span>
            ) : (
              null
            )
          }
          <p className="text-xs text-gray-500">{formatMessageTime(post.createdAt)} {formatMessageDate(post.createdAt)} </p>
        </div>
      </div>
      <div>
      {post?.userId?._id === authUser._id && (
          <div onClick={() => setSelectedPost(post)} >
            <Trash onClick={() => setShowDeleteDialog(true)}className="w-5 h-5 rounded-full font-extrabold text-red-800 cursor-pointer" />
          </div>
        )}
      </div>
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{padding: "20px"}}>
            <p className="mb-4 text-lg font-semibold" style={{marginBottom: "8px"}}>Are you sure you want to delete?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="bg-red-500 text-white w-20 rounded-lg" style={{padding: "8px"}}>Yes</button>
              <button onClick={() => setShowDeleteDialog(false)} className="bg-gray-300 w-20 rounded-lg" style={{padding: "8px"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Post Content */}
      <div style={{marginTop: "10px"}}>
        <p className="text-sm font-semibold" style={{marginBottom: "8px"}} >{post.text}</p>
        {post?.image && (
          <img
            src={post.image}
            alt="Post"
            className="rounded-lg w-full max-h-60 object-cover mt-2"
          />
        )}
      </div>

      {/* Like & Comment Buttons */}
      <div className="flex items-center gap-4 justify-between" style={{marginTop: "10px"}}>
        <button
          className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
          onClick={() => toggleLike(post._id)}
        >
          <Heart size={16} fill={isLiked ? "red" : "none"} />
          <span>{post.likes.length}</span>
          {
            post.likes.length == 1 ? (
              <span>Like</span>
            ) : (
              <span>Likes</span>
            )
          }
          
        </button>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <MessageCircle size={16} /><p>Comments</p>
        </button>
      </div>

      {/* Comments Section */}
      {commentOpen && (
        <div style={{marginTop: "20px"}}>
          <CommentInput postId={post._id} />
          <Comments comments={comments[post._id] || []} />
        </div>
      )}
    </div>
  );
};

export default Post;