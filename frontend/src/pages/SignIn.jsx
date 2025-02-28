import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const SignIn = () => {
  const { signin, isSigningIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
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

    const success = validateForm();
    if (success) {
      await signin(formData);
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen bg-[#d8d0e3] relative'>
      {/* Background Text */}
      <div className="absolute text-[20rem] font-extrabold text-[#f8f8f8] z-0 ">
        RSOCIAL
      </div>

      {/* Sign-In Form */}
      <div className='flex flex-col items-center justify-center bg-[#240B42] shadow-xl w-96 h-[400px] rounded-md z-10'>
        <h1 className='text-3xl font-bold text-white' style={{ marginTop: "10px", marginBottom: "40px" }}>SignIn</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center justify-center w-72 text-white'>
          <div className='flex flex-col w-full'>
            <label className='text-white font-semibold'>Email</label>
            <input type="email"
              style={{ padding: "6px" }}
              placeholder='johndoe@example.com'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className='border-2 rounded-md border-white outline-none placeholder:text-gray-500' />
          </div>
          <div className='flex flex-col w-full'>
            <label className='text-white font-semibold'>Password</label>
            <input type="password"
              style={{ padding: "6px" }}
              placeholder='******'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className='border-2 rounded-md border-white outline-none placeholder:text-gray-500' />
          </div>
          <button type="submit" className='flex items-center justify-center p-5 w-32 h-12 bg-green-700 rounded-md font-bold text-white hover:bg-green-500' style={{ marginTop: "15px", marginBottom: "15px" }}>
            {isSigningIn ? (
              <Loader className='size-10 animate-spin' />
            ) : (
              "Sign-in"
            )}
          </button>
        </form>
        <p className='text-white'>Don't have an account? <Link to="/signUp" className='text-blue-700 hover:underline'> Go to SignUp</Link> </p>
      </div>
    </div>
  );
};

export default SignIn;
