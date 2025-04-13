import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function Prakhar() {
    return (
        <div className="flex flex-col">
            <Navbar/>
            <div className ='flex'>
                <Sidebar/>
            <h2 className="text-black font-semibold text-2xl">Welcome to Sales Report</h2>
            </div>
        </div>
    
)
  }
  
  export default Prakhar;