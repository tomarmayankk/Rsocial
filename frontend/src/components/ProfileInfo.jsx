import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { Pencil } from 'lucide-react';
import { formatMessageDate } from '../lib/utils';

const ProfileInfo = () => {
    const { authUser } = useAuthStore();
      const { isUpdatingProfile, updateProfile } = useUserStore();
      const [selectedImage, setSelectedImage] = useState(null);
    
      const handleImageUpload = async (e) => {
        const file = await e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
          const base64Image = reader.result;
          setSelectedImage(base64Image);
          await updateProfile({ profilePic: base64Image });
        };
      };
  return (
    <div className='w-96 rounded-md bg-gray-200 shadow-2xl h-80' style={{padding: "20px"}}>
        <div className='flex items-center flex-col justify-between gap-4' style={{}}>
        <div className="relative">
          <img 
            src={selectedImage || authUser?.profilePic || "/avatar.png"} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
          <label className="flex items-center justify-center absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-400 w-10 h-10 shadow-md">
            <Pencil className="text-white text-lg" />
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <p className="text-sm font-semibold text-gray-600 text-center">
          {isUpdatingProfile ? "Uploading..." : "Click on edit icon to update your profile Image"}
        </p>
          <div>
          <p className="text-lg font-semibold">{authUser?.fullName || "John Doe"}</p>
          <p className="text-gray-500">{authUser?.email || "johndoe@example.com"}</p>
            <div className='flex items-center justify-center gap-2'>
            <p className='text-black font-semibold'>Joined:</p>
            <p className="text-gray-500">{formatMessageDate(authUser?.createdAt) || "johndoe@example.com"}</p>
            </div>
          </div>
    </div>
</div>
)
}

export default ProfileInfo