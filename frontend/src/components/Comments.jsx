import React from "react";
import Comment from "./Comment";

const Comments = ({ comments }) => {
  return (
    <div className="flex flex-col gap-2">
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;
