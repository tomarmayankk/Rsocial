import React from 'react'
import PostInput from './PostInput'
import AllPosts from './AllPosts'

const Feed = () => {
  return (
    <div className='flex flex-col items-center w-[1100px] bg-none rounded-xl'>
      <PostInput/>
      <AllPosts/>
    </div>
  )
}

export default Feed
