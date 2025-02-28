import React from "react";
import { formatMessageDate, formatMessageTime } from "../lib/utils";

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-2 w-full" style={{padding: "10px"}}>
      {/* Profile Picture */}
      <div className="flex items-center justify-center">
        <img
          className="w-10 h-10 rounded-full"
          src={comment?.userId?.profilePic || "/avatar.png"} // Default avatar if no profile pic
          alt="User Avatar"
        />
      </div>

      {/* Comment Content */}
      <div className="flex flex-1 w-full justify-between bg-[#e5ecfb] rounded-md" style={{padding: "8px"}}>
        <div className="w-full">
          <h1 className="text-sm font-medium">{comment?.userId?.fullName || "Anonymous"}</h1>
          <p>{comment?.text}</p>
        </div>

        {/* Timestamp */}
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">
            {formatMessageTime(comment?.createdAt) 
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
