import React, { useState } from "react";
import PostDialog from "./PostDialog";

const PostInput = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-white p-4 m-2 md:m-0 rounded-lg border border-gray-300 w-full'>  
       <div className='flex items-center  justify-between gap-3' style={{paddingRight: "20px"}} onClick={() => setIsOpen(true)} >
        <input
        placeholder='Start a Post'
        className='rounded-full h-12 border-none w-full outline-none' 
        style={{padding: "20px"}} />
    </div>
      {isOpen && <PostDialog onClose={() => setIsOpen(false)} />}
    </div>
  );
};
export default PostInput;
