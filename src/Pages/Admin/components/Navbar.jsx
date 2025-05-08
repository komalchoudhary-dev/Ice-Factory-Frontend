// import React, { useState, useRef, useEffect } from "react";
// import logo from "../../../assets/mfpLogo.png";
// import settingsIcon from "../../../assets/settings2.png";
// import adminprofileIcon from "../../../assets/profile.png";
// import logout from "../../../assets/logout.png";

// const Navbar = () => {
//   const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const settingsRef = useRef();
//   const profileRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         settingsRef.current &&
//         !settingsRef.current.contains(e.target)
//       ) {
//         setShowSettingsDropdown(false);
//       }
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(e.target)
//       ) {
//         setShowProfileDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="h-15 bg-white border-b-1 border-black flex items-center justify-between px-6 left-56 z-10">
//       <div className="flex items-center space-x-1">
//         <img src={logo} alt="Ice Factory" className="h-14 w-14" />
//         <span className="text-2xl font-bold text-black">Muzaffarpur Ice Factory</span>
//       </div>

//       <div className="flex items-center gap-4">
//         {/* Settings Icon */}
//         <div className="relative" ref={settingsRef}>
//           <button
//             className="p-2 rounded-full bg-white hover:bg-blue-400"
//             onClick={() => setShowSettingsDropdown(prev => !prev)}
//           >
//             <img src={settingsIcon} alt="Settings" className="w-10 h-10" />
//           </button>
//           {showSettingsDropdown && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
//                 Change Password
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Admin Profile Icon */}
//         <div className="relative" ref={profileRef}>
//           <button
//             className="p-2 rounded-full bg-white hover:bg-blue-400"
//             onClick={() => setShowProfileDropdown(prev => !prev)}
//           >
//             <img src={adminprofileIcon} alt="Profile" className="w-8 h-8" />
//           </button>
//           {showProfileDropdown && (
//             <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50 overflow-hidden">
//               <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
//               onClick={() =>
//                 navigate("/admin-order-request-detail")
//               }>

//   <img src={logout} alt="Logout" className="w-6 h-6 mr-2" />
//   <span className="text-base">Logout</span>
// </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/mfpLogo.png";
import settingsIcon from "../../../assets/settings2.png";
import adminprofileIcon from "../../../assets/profile.png";
import logoutIcon from "../../../assets/logout.png";

const Navbar = () => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const settingsRef = useRef();
  const profileRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettingsDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  
    navigate("/"); 
  };
  const handleChangePassword = () => {
    navigate("/admin-changePassword");
  };
  return (
    <div className="h-15 bg-white border-b border-black flex items-center justify-between px-2 z-10">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Ice Factory" className="h-14 w-14" />
        <span className="text-2xl font-bold text-black">Muzaffarpur Ice Factory</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Settings Icon */}
        <div className="relative" ref={settingsRef}>
          <button
            className="p-2 rounded-full bg-white hover:bg-blue-400"
            onClick={() => setShowSettingsDropdown((prev) => !prev)}
          >
            <img src={settingsIcon} alt="Settings" className="w-10 h-10" />
          </button>
          {showSettingsDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          )}
        </div>

        {/* Admin Profile Icon */}
        <div className="relative" ref={profileRef}>
          <button
            className="p-2 rounded-full bg-white hover:bg-blue-400"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <img src={adminprofileIcon} alt="Profile" className="w-8 h-8" />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50 overflow-hidden">
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <img src={logoutIcon} alt="Logout" className="w-6 h-6 mr-2" />
                <span className="text-base">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
