import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore"; // Get authUser from auth store

export const usePostStore = create((set, get) => ({
  isCreatingPost: false,
  selectedPost: null,
  comments: {}, // Store comments by postId
  posts: [],
  
  setSelectedPost: (post) => set({ selectedPost: post }),

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
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const res = await axiosInstance.post(`/post/create-posts/${authUser._id}`, {
        ...postData,
        userId: authUser._id, // Pass userId inside the body
      });

      set((state) => ({ posts: [res.data, ...state.posts] }));
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
    }
  },

  deletePost: async (postId) => {
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) {
      toast.error("User not authenticated!");
      return;
    }
  
    try {
      await axiosInstance.delete(`/post/delete-posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }));
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  },

  createComment: async (postId, commentText) => {
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const res = await axiosInstance.post(`/post/create-comments/${authUser._id}/${postId}`, {
        text: commentText,
      });

      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), res.data] }
            : post
        ),
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), res.data],
        },
      }));

      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  },

  fetchComments: async (postId) => {
    if (get().comments[postId]) return; // Prevent unnecessary refetching

    try {
      const res = await axiosInstance.get(`/post/get-comments/${postId}`);
      set((state) => ({
        comments: { ...state.comments, [postId]: res.data },
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, comments: res.data } : post
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch comments");
    }
  },
  toggleLike: async (postId) => {
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) {
        toast.error("User not authenticated!");
        return;
    }

    try {
        const res = await axiosInstance.put(`/post/toggle-like/${postId}`, { userId: authUser._id });

        set((state) => ({
            posts: state.posts.map((post) =>
                post._id === postId ? { ...post, likes: res.data.likes } : post
            ),
        }));
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to toggle like");
    }
},
}));
