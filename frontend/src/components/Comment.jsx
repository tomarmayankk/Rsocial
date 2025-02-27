import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-2 w-full p-2">
      {/* Profile Picture */}
      <div className="flex items-center justify-center">
        <img
          className="w-10 h-10 rounded-full"
          src={comment?.userId?.profilePic || "/avatar.png"} // Default avatar if no profile pic
          alt="User Avatar"
        />
      </div>

      {/* Comment Content */}
      <div className="flex flex-1 w-full justify-between bg-[#e5ecfb] rounded-md p-2">
        <div className="w-full">
          <h1 className="text-sm font-medium">{comment?.userId?.fullName || "Anonymous"}</h1>
          <p>{comment?.text}</p>
        </div>

        {/* Timestamp */}
        <div>
          <p className="text-xs text-gray-500">
            {new Date(comment?.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) || "Just now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
