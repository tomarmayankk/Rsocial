import React, { useState } from "react";
import { usePostStore } from '../store/usePostStore';
import { Loader, Paperclip } from 'lucide-react';

const PostDialog = ({ onClose }) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { createPost, isCreatingPost } = usePostStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        text: text.trim(),
        image: selectedImage,
      });
      setText("");
      setSelectedImage(null);
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[600px] h-auto" style={{padding: "8px"}} >
        <div className="flex justify-between items-center" style={{marginBottom: "8px"}}>
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button onClick={onClose} className="text-red-500 text-2xl font-bold">x</button>
        </div>
        <textarea
          className="w-full border rounded-md h-40 p-2 mt-2"
          style={{padding: "8px", marginTop: "8px"}}
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        ></textarea>
        {selectedImage && (
          <div className="mt-3">
            <img src={selectedImage} alt="Preview" className="w-full h-40 object-cover rounded-md" />
          </div>
        )}
        <div className=" flex items-center" style={{marginTop: "6px"}}>
          <label className="cursor-pointer flex items-center gap-2 text-blue-500">
            <Paperclip className="w-5 h-5" />
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
        <button className="w-full bg-blue-500 text-white rounded-lg flex items-center justify-center" style={{marginTop: "4px", paddingLeft: "4px", paddingRight: "4px"}} onClick={handleSubmit}>
        {isCreatingPost ? (
          <Loader className='size-10 animate-spin' />
        ) : (
          "Create Post"
        )}
        </button>
      </div>
    </div>
  );
};

export default PostDialog;