import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import Profile from './pages/Profile';

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );

  return (
    <div className='bg-[#d8d0e3] relative min-h-screen flex flex-col justify-center items-center overflow-hidden'>
      {/* Background Text */}
      <div className="absolute text-[24rem] font-extrabold text-[#461681] opacity-20 z-0">
      </div>

      {/* Routes */}
      <div className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
