import React from "react";
import logo from "../../../assets/mfpLogo.png"; // Ice Factory logo (image + text)
import settingsIcon from "../../../assets/settings2.png";
import adminprofileIcon from "../../../assets/profile.png";
const Navbar = () => {
  return (
    <div className="h-15 bg-white border-b-1 border-black flex items-center justify-between px-6 left-56 z-10">
      <div className="flex items-center space-x-1">
  <img src={logo} alt="Ice Factory" className="h-14 w-14" />
  <span className="text-2xl font-bold text-black">Muzaffarpur Ice</span>
</div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-white hover:bg-blue-400">
          <img src={settingsIcon} alt="Settings" className="w-10 h-10" />
        </button>
        <button className="p-2 rounded-full bg-white hover:bg-blue-400">
          <img src={adminprofileIcon} alt="Profile" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

