import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Consumer from "../components/consumer";


function customer() {
    return (
        <div className="flex flex-col">
            <Navbar/>
            <div className ="flex min-h-screen  w-full"  >
                <Sidebar/>
                <div className="flex flex-col  w-full" >
                       <Consumer/>
                </div>
            
            </div>
        </div>
    
)
  }
  
  export default customer;