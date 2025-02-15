import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import Profile from './pages/Profile';

function App() {

  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className = 'size-10 animate-spin'/>
    </div>
  )

  return (
<div>
  <Routes>
    <Route path="/" element = {authUser? <Home/> : <Navigate to="signIn" />} />
    <Route path="/signup" element = { !authUser ? <SignUp/> : <Navigate to="/" /> } />
    <Route path="/signin" element = { !authUser ? <SignIn/> : <Navigate to="/" />} />
    <Route path="/profile" element = { authUser ? <Profile/> : <Navigate to="/" />} />
  </Routes>
  <Toaster />
</div>
  )
}

export default App
