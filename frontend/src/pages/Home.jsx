import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

const Home = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />  
      {/* Main content layout */}
      <div style={{paddingTop: "20px", padding: "10px"}}>
        <div className="max-w-6xl mx-auto flex justify-between gap-8">
          <Sidebar />
          <Feed /> 
        </div>
      </div>
    </>
  )
}

export default Home
