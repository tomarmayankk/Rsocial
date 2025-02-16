import React, { useState } from "react";
import { usePostStore } from '../store/usePostStore';

const PostDialog = ({ onClose }) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { createPost } = usePostStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        // Use reader.result to get the base64 image
        const image = reader.result;
        // Now you can include the image in the post creation logic
        createPost({
          text: text.trim(),
          image, // Add imageUrl to your post data
        });
      };
    } else {
      try {
        await createPost({
          text: text.trim(),
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[500px]" style={{ padding: "20px" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button onClick={onClose} className="text-red-500 text-2xl font-bold">
            x
          </button>
        </div>
        {/* Text Area */}
        <textarea
          className="w-full border rounded-md h-80"
          style={{ padding: "10px", marginTop: "20px" }}
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        ></textarea>
        {/* Image Upload */}
        <input
          type="file"
          className="mt-3 w-full"
          onChange={handleImageChange}
        />
        {/* Post Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg" style={{ marginTop: "20px" }} onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default PostDialog;
