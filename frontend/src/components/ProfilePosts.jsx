import React, { useEffect } from 'react';
import { usePostStore } from '../store/usePostStore';
import Post from './Post';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePosts = () => {
  const { posts, fetchPosts } = usePostStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  console.log("All Posts:", posts); 
  console.log("Auth User ID:", authUser?._id);

  // Fix: Access userId._id instead of userId directly
  const userPosts = posts.filter(post => String(post.userId?._id) === String(authUser?._id));

  return (
    <div className="flex w-full flex-col items-center gap-4 no-scrollbar h-[550px]"
         style={{ marginTop: "15px", overflowY: "auto", maxHeight: "80vh" }}>

      {userPosts.length > 0 ? (
        userPosts.map(post => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-red-500">No posts found for user: {authUser?.fullName}</p>
      )}
    </div>
  );
};

export default ProfilePosts;
