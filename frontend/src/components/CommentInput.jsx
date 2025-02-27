import React, { useState } from "react";
import { usePostStore } from "../store/usePostStore";

const CommentInput = ({ postId }) => {
  const { createComment } = usePostStore();
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (commentText.trim() === "") return; // Prevent empty comments

    createComment(postId, commentText);
    setCommentText(""); // Clear input after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="border rounded-full px-3 py-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
