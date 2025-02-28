import React, { useState } from "react";
import { House, LogOut, Repeat2, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { signout, authUser } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    signout();
    setShowLogoutDialog(false);
  };
  return (
    <div
      className="flex items-center justify-between bg-[#1a0832] h-15 shadow-sm w-full top-0 fixed z-10"
      style={{ padding: "10px", paddingRight: "100px", paddingLeft: "100px" }}
    >
      <div className="flex items-center gap-1">
        <h1 className="text-[#763cc3] font-bold text-3xl">RSOCIAL</h1>
      </div>
      {authUser ? (
        <div className="flex items-center gap-6 text-white font-bold">
          <Link to="/profile">
            <User />
          </Link>
          <Link to="/">
            <House />
          </Link>
          <div
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center justify-center w-8 h-8 bg-gray-50 cursor-pointer text-black opacity-40 rounded-md"
          >
            <LogOut />
          </div>
        </div>
      ) : null}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{padding: "20px"}}>
            <p className="mb-4 text-lg font-semibold" style={{marginBottom: "8px"}}>Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg" style={{padding: "8px"}}>Logout</button>
              <button onClick={() => setShowLogoutDialog(false)} className="bg-gray-300 px-4 py-2 rounded-lg" style={{padding: "8px"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;