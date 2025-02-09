import React from 'react'
import {LogOut, Repeat2} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
const Navbar = () => {
    const {signout, authUser} = useAuthStore();

  return (
    <div className='flex items-center justify-between bg-blue-600 h-15 shadow-sm top-0 w-full'>
        <div className='flex items-center justify-center gap-1'>
        <span className='text-white'><Repeat2 /></span>
        <h1 className='text-white font-bold text-2xl'>RSocial</h1>
        </div>
        {
            authUser ? (
            <div onClick={signout}>
                <LogOut />
            </div>
            ) : (
                <></>
            )
        }

    </div>
  )
}

export default Navbar