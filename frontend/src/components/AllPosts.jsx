import React, { useEffect } from "react";
import Post from "./Post";
import { usePostStore } from "../store/usePostStore";

const AllPosts = () => {
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, [fetchPosts]);

  return (
    <div className="flex w-full flex-col items-center gap-4 no-scrollbar" style={{ marginTop: "15px", overflowY: "auto", maxHeight: "80vh" }}>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};
export default AllPosts;
