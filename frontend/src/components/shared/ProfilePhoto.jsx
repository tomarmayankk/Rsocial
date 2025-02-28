import React from 'react'
import { useAuthStore } from '../../store/useAuthStore';

const ProfilePhoto = () => {
    const { authUser} = useAuthStore();
  return (
    <div className='flex items-center justify-center w-8 h-8'>
        <img src={authUser?.profilePic || "/avatar.png" } alt="" className='rounded-full'/>
    </div>
  )
}

export default ProfilePhoto