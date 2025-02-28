import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageDate } from '../lib/utils';

const Sidebar = () => {
  const {authUser} = useAuthStore();
  return (
    <div className='w-[400px]'>
      <div className='flex flex-col items-center justify-center bg-[#f8f8f8] rounded-md w-72 h-96 gap-8 text-gray-900 shadow-md'>
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="relative">
          <img 
            src={authUser?.profilePic || "/avatar.png"} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">{authUser?.fullName || "John Doe"}</p>
          <p className="text-gray-500">{authUser?.email || "johndoe@example.com"}</p>
          <div className='flex flex-row gap-2'>
          <p className='text-black font-semibold'>Member Since:</p>
          <p className="text-gray-500">{authUser?.createdAt ? formatMessageDate(authUser?.createdAt) : "Date not available"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar