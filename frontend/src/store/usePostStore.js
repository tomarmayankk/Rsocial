import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore"; // Get authUser from auth store

export const usePostStore = create((set, get) => ({
  isCreatingPost: false,
  posts: [],

  // Fetch Posts
  fetchPosts: async () => {
    try {
      const res = await axiosInstance.get("/post/get-posts");
      set({ posts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    }
  },

  // Create a New Post
  createPost: async (postData) => {
    const authUser = useAuthStore.getState().authUser; // Get logged-in user
    if (!authUser) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const res = await axiosInstance.post(`/post/create-posts/${authUser._id}`, postData);
      set((state) => ({ posts: [res.data, ...state.posts] })); // Add new post at top
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
    }
  },
}));
