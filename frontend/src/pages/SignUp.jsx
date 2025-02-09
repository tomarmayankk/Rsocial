import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
const SignUp = () => {
  const {signup, isSigningUp} = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter a full name");
      return false;
    }
    if (!formData.email.trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true; // All validations pass
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sucess = validateForm();
    if(sucess === true) {
     await signup(formData)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='flex flex-col items-center justify-center bg-blue-50 shadow-xl w-96 h-[450px] rounded-md'>
          <h1 className='text-xl font-semibold'>SignUp</h1>
          <form action="" onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-col'>
            <label htmlFor="">FullName</label>
            <input type="text" 
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className='border-2 rounded-md'/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Email</label>
            <input type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
             className='border-2 rounded-md'/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="">Password</label>
            <input type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
             className='border-2 rounded-md'/>
            </div>
            <button type="submit" className='flex items-center justify-center p-5 w-32 h-12 bg-green-700 rounded-md font-bold text-white hover:bg-green-500'>{
              isSigningUp ? (
                <Loader className = 'size-10 animate-spin'/>
              ) : (
                "Sign-up"
              )
              }</button>
          </form>
          <p>Already have an account? <Link to="/signIn" className='text-blue-700 hover:underline'> Go to SignIn</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp