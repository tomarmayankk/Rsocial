import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () => {
  const {authUser} = useAuthStore();
  return (
    <div className='w-[400px]'>
      <div className='flex flex-col items-center justify-center bg-gray-50 rounded-md shadow-xl w-72 h-96 gap-8'>
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
          <p className="text-gray-500">{authUser?.createdAt?.split("T") [0]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar