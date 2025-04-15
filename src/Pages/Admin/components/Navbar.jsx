import React from "react";
import logo from "../../../assets/logo.png"; // Ice Factory logo (image + text)
import settingsIcon from "../../../assets/settings.png";
import adminprofileIcon from "../../../assets/profile.png";
const Navbar = () => {
  return (
    <div className="h-12 bg-blue-500/60 border-b-1 border-black flex items-center justify-between px-6 left-56 z-10">
      <div className="flex ">
        <img src={logo} alt="Ice Factory" className="h-10" />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
          <img src={settingsIcon} alt="Settings" className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full bg-purple-300 hover:bg-purple-400">
          <img src={adminprofileIcon} alt="Profile" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

