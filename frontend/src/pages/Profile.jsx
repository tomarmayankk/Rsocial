import React from 'react'
import ProfileInfo from '../components/ProfileInfo'
import ProfilePosts from '../components/ProfilePosts'
import Navbar from '../components/Navbar'

const Profile = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />  
      {/* Main content layout */}
      <div style={{paddingTop: "20px", padding: "10px", marginRight: "100px", marginLeft: "100px", marginTop: "60px", maxHeight: "600px"}}>
        <div className="flex mx-auto justify-between gap-8">
          <ProfileInfo />
          <div className='w-6xl'>
          <h1 className='text-2xl font-semibold text-gray-800'>Your posts</h1>
          <ProfilePosts/>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile