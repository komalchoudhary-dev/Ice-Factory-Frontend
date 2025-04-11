import React from "react";
import Sidebar from "./Sidebar";
import "../css/styles.css";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}
