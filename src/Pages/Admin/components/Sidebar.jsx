// import React from "react";
// import { NavLink } from "react-router-dom";
// import dashboardIcon from '../../../assets/dashboard.png';
// import requestIcon from '../../../assets/orderSidebar.png';
// import deliveryIcon from '../../../assets/truckSidebar.png';
// import salesIcon from '../../../assets/SalesReportSideBar.png';

// const Sidebar = () => {
//   const navItems = [
//     { path: "/admin-dashboard", label: "Dashboard", icon: dashboardIcon },
//     { path: "/admin-order-request", label: "Order Request", icon: requestIcon },
//     { path: "/admin-tobe-delivered", label: "Order to be Delivered", icon: deliveryIcon },
//     { path: "/sales-report", label: "Sales Report", icon: salesIcon },
//   ];

//   return (
//     <div className="w-28 h-screen bg-white shadow-md border-r flex flex-col pt-4">
//       {/* <div className="text-2xl font-bold text-blue-700 px-4 mb-8">Admin</div> */}
//       {navItems.map((item, index) => (
//         <NavLink
//           key={index}
//           to={item.path}
//           className={({ isActive }) =>
//             `flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-100 transition ${
//               isActive ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-700"
//             }`
//           }
//         ><div className="flex flex-col items-center">
//           <img src={item.icon} alt={item.label} className="w-8 h-8" />
//           <p>{item.label}</p>
//           </div>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import dashboardIcon from '../../../assets/dashboard.png';
// import requestIcon from '../../../assets/orderSidebar.png';
// import deliveryIcon from '../../../assets/truckSidebar.png';
// import salesIcon from '../../../assets/SalesReportSideBar.png';

// const Sidebar = (props) => {
//   console.log("props val ", props.val);

//   const navItems = [
//     { path: "/admin-dashboard", label: "Dashboard", icon: dashboardIcon },
//     { path: "/admin-order-request", label: "Order Request", icon: requestIcon },
//     { path: "/admin-tobe-delivered", label: "Order to be Delivered", icon: deliveryIcon },
//     { path: "/sales-report", label: "Sales Report", icon: salesIcon },
//   ];

//   return (
//     <div className="w-24 h-screen bg-white border-r shadow-md flex flex-col items-center py-4">
//       <div className="mb-4">
//         {/* Optional Logo */}
//       </div>
//       {navItems.map((item, index) => (
//         <NavLink
//           key={index}
//           to={item.path}
//           className={({ isActive }) =>
//             `flex flex-col items-center mb-6 text-xs ${
//               isActive ? 'text-blue-600 font-bold' : 'text-black'
//             }`
//           }
//         >
//           <img src={item.icon} alt={item.label} className="w-6 h-6 mb-1" />
//           <span className="text-center whitespace-nowrap">{item.label}</span>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from '../../../assets/dashboard.png';
import requestIcon from '../../../assets/orderSidebar.png';
import deliveryIcon from '../../../assets/truckSidebar.png';
import salesIcon from '../../../assets/SalesReportSideBar.png';
import profileIcon from "../../../assets/Consumer.png";
import orderHistoryIcon from "../../../assets/orderHistory.png";

const Sidebar = (props) => {
  console.log("props val ", props.val);

  const navItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: dashboardIcon },
    { path: "/admin-order-request", label: "Order Request", icon: requestIcon },
    { path: "/admin-tobe-delivered", label: "Order to be Delivered", icon: deliveryIcon },
    { path: "/admin-Past-Order-history", label: "Order History", icon: orderHistoryIcon },
    { path: "/sales-report", label: "Sales Report", icon: salesIcon },
    { path: "/admin-Customer", label: "Consumer", icon: profileIcon}
  ];

  return (
    <div className="w-20 h-full-screen bg-white border-r shadow-md flex flex-col items-center py-4">
      <div className="mb-4">
        {/* Optional Logo */}
      </div>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          title={item.label} // Tooltip on hover
          className={({ isActive }) =>
            `flex flex-col items-center mb-6 text-xs text-center ${
              isActive ? 'text-blue-400 font-bold' : 'text-black'
            }`
          }
        >
          <img src={item.icon} alt={item.label} className="w-8 h-8 mb-1" />
          <span className="max-w-[60px]">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

