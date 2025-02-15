import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import { formatMessageTime } from "../lib/utils";

const Post = ({post}) => {
  return (
    <div className="bg-white w-full rounded-lg border border-gray-300" style={{padding: "8px"}}>
      {/* User Info */}
      <div className="flex gap-2">
        <img src={post?.userId?.profilePic || './avatar.png' } alt="" className="w-6 h-6 rounded-full" />
        <div>
          <h1 className="text-sm font-bold">{post?.userId?.fullName}</h1>
          <p className="text-xs text-gray-500">{formatMessageTime(post.createdAt)}</p>
        </div>
      </div>
      {/* Post Content */}
      <div style={{marginTop: "6px"}}>
        <p className="text-sm">{post.text}🚀</p>
        <img
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="Post"
          className="rounded-lg w-full max-h-60 object-cover"
          style={{marginTop: "6px"}}
        />
      </div>

      {/* Like & Comment Buttons */}
      <div className="flex items-center gap-4" style={{marginTop: "9px"}}>
        <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
          <Heart size={16} /> <span>Like</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
          <MessageCircle size={16} /> <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
