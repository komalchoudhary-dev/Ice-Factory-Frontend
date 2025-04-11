import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>Muzaffarpur Ice<br />Factory</h2>
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>Orders</NavLink>
        <NavLink to="/consumer" className={({ isActive }) => isActive ? "active" : ""}>Consumer</NavLink>
        <NavLink to="/sales-report" className={({ isActive }) => isActive ? "active" : ""}>Sales Report</NavLink>
      </nav>
    </div>
  );
}
