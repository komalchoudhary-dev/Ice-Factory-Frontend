import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function customer() {
    return (
        <div className="flex flex-col">
            <Navbar/>
            <div className ="flex min-h-screen  w-full"  >
                <Sidebar/>
                <div className="flex flex-col  w-full" >
                    

                    
                    <h1>hello World I am prakhar</h1>




                </div>
            
            </div>
        </div>
    
)
  }
  
  export default customer;