import React from 'react'
import PostInput from './PostInput'
import AllPosts from './AllPosts'

const Feed = () => {
  return (
    <div className='flex flex-col items-center w-[900px]'>
      <PostInput/>
      <AllPosts/>
    </div>
  )
}

export default Feed
