import React from "react";
import { LogOut, Repeat2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { signout, authUser } = useAuthStore();

  return (
    <div
      className="flex items-center justify-between bg-blue-600 h-15 shadow-sm w-full"
      style={{ marginTop: "0", padding: "10px" }}
    >
      <div className="flex items-center justify-center gap-1">
        <span className="text-white">
          <Repeat2 />
        </span>
        <h1 className="text-white font-bold text-2xl">RSocial</h1>
      </div>
      {authUser ? (
        <div className="flex items-center justify-center gap-2 text-white font-bold">
          <Link to="/profile">
            <div className="flex justify-between items-center gap-2">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-lg font-semibold">
                {authUser?.fullName || "John Doe"}
              </p>
            </div>
          </Link>
          <div
            onClick={signout}
            className="flex items-center justify-between w-8 h-8 bg-gray-50 cursor-pointer text-black opacity-40 rounded-md"
            style={{ padding: "2px" }}
          >
            <LogOut />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
