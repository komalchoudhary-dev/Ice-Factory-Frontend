// import Sidebar from '../components/Sidebar'; // ✅ fix path
// import Navbar from '../components/Navbar'; // ✅ fix path
// import React from 'react';
// import {useState,useEffect} from 'react';
// import axios from 'axios';
// import DeliveryTruck from '../../../assets/deliveryTruckOndashboard.png';
// import tick from '../../../assets/tick.png';
// import Request from '../../../assets/RequestDashboard.png';
// import Money from '../../../assets/money.png';
// import Sold from '../../../assets/sold.png';
// import lastMonth from '../../../assets/prevMonth.png';

// function Dashboard() {
//   const [apiData, setApiData] = useState([]);
//   const today = new Date();
// const formattedDate = today.toISOString().split('T')[0];
//     console.log("Formatted Date: ", formattedDate);
//   // getting the data from the api
//   function getData(){
//     const data = axios.get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`)
//     .then((response) => {
//       console.log("Todays delivery ",response.data)
//       setApiData(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data", error);
//     });
//   }


// const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
// const ModifiedDate = today.toLocaleDateString('en-GB', options);
 
//   useEffect(() => {
//     getData();
//   }
//   , []);

//   return (
//     <div className="flex flex-col">
//       <div><Navbar/></div>
//       <div className='flex'>
//          <Sidebar />
//          <div className='flex flex-col w-full p-2'>
            
//          <div className='flex flex-col w-full p-2'>
        
//                    <div className='flex flex-col h-8 '>
//                    <p className='text-2xl font-bold    flex items-center justify-left px-4'>{ModifiedDate}</p>
//                    </div><br/>

//                   <div className='bg-white w-full  p-4'>
                  
//         </div> 
//         <div className="grid grid-cols-3 gap-8 p-4">
//   {/* Order To Be Delivered */}
//   <div className="w-80 h-24 bg-blue-200 border border-black rounded-md text-black flex items-center justify-between px-4">
//     <div className="text-left">
//       <p className="font-bold text-sm">Pending Delivery</p>
//       <p className="text-center font-semibold">{apiData.length}</p>
//     </div>
//     <img src={DeliveryTruck} alt="Delivery Truck" className="h-10 w-auto" />
//   </div>

//   {/* Order Delivered */}
//   <div className="w-80 h-24 bg-blue-200 border border-black rounded-md text-black flex items-center justify-between px-4">
//     <div className="text-left">
//       <p className="font-bold text-sm">Order Delivered</p>
//       <p className="text-center font-semibold">{apiData.length}</p>
//     </div>
//     <img src={tick} alt="Delivery Truck" className="h-10 w-auto" />
//   </div>

//   {/* New Request */}
//   <div className="w-80 h-24 bg-blue-200 border border-black rounded-md text-black flex items-center justify-between px-4">
//     <div className="text-left">
//       <p className="font-bold text-sm">New Request</p>
//       <p className="text-center font-semibold">{apiData.length}</p>
//     </div>
//     <img src={Request} alt="New Request" className="h-10 w-auto" />
//   </div>
//   <div className="w-80 h-24 bg-blue-200 border border-black rounded-md text-black flex items-center justify-between px-4">
//     <div className="text-left">
//       <p className="font-bold text-sm">No of Ice Blocks Sold</p>
//       <p className="text-center font-semibold">{apiData.length}</p>
//     </div>
//     <img src={Sold} alt="Sold icon" className="h-10 w-auto" />
//   </div>
//   <div className="w-80 h-24 bg-blue-200 border border-black rounded-md text-black flex items-center justify-between px-4">
//     <div className="text-left">
//       <p className="font-bold text-sm">Revenue Generated </p>
//       <p className="text-center font-semibold">Rs. {apiData.length*750}</p>
//     </div>
//     <img src={Money} alt="money" className="h-10 w-auto" />
//   </div>
//   <div className="w-80 h-24 bg-blue-200 border border-black rounded-md text-black flex items-center justify-between px-4">
//     <div className="text-left">
//       <p className="font-bold text-sm">Previous Month Sales</p>
//       <p className="text-center font-semibold">{apiData.length}</p>
//     </div>
//     <img src={lastMonth} alt="Delivery Truck" className="h-10 w-auto" />
//   </div>
// </div>

//         </div>
//         <br/>
//           <p className='font-bold text-xl'>Monthly Sales</p>
//           <div>Graph</div>
//         </div>
      
//       </div>
//       </div>
    
//   );
// }

// export default Dashboard;

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeliveryTruck from '../../../assets/deliveryTruckOndashboard.png';
import tick from '../../../assets/tick.png';
import Request from '../../../assets/RequestDashboard.png';
import Money from '../../../assets/money.png';
import Sold from '../../../assets/sold.png';
import lastMonth from '../../../assets/prevMonth.png';

function Dashboard() {
  const [apiData, setApiData] = useState([]);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  function getData(){
        const data = axios.get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`)
        .then((response) => {
          console.log("Todays delivery ",response.data)
          setApiData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
      }

  const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
  const ModifiedDate = today.toLocaleDateString('en-GB', options);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />

        <div className="flex flex-col w-full p-4">
          {/* Date Display */}
          <div className="flex justify-center mb-6">
            <p className="text-2xl font-bold bg-sky-200 border border-black rounded-md px-6 py-2 shadow-md">
              {ModifiedDate}
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Pending */}
            <div className="flex items-center justify-between bg-red-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-gray-700">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{apiData.length}</p>
              </div>
              <img src={DeliveryTruck} alt="Delivery Truck" className="h-12 w-auto" />
            </div>

            {/* Delivered */}
            <div className="flex items-center justify-between bg-green-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-gray-700">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{apiData.length}</p>
              </div>
              <img src={tick} alt="Tick" className="h-12 w-auto" />
            </div>

            {/* New Request */}
            <div className="flex items-center justify-between bg-yellow-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-gray-700">New Request</p>
                <p className="text-2xl font-bold text-gray-900">{apiData.length}</p>
              </div>
              <img src={Request} alt="New Request" className="h-12 w-auto" />
            </div>

            {/* Block(s) Sold */}
            <div className="flex items-center justify-between bg-blue-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-gray-700">Block(s) Sold</p>
                <p className="text-2xl font-bold text-gray-900">{apiData.length}</p>
              </div>
              <img src={Sold} alt="Sold Icon" className="h-12 w-auto" />
            </div>

            {/* Revenue (₹) */}
            <div className="flex items-center justify-between bg-purple-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-gray-700">Revenue (₹)</p>
                <p className="text-2xl font-bold text-gray-900">Rs. {apiData.length * 750}</p>
              </div>
              <img src={Money} alt="Money" className="h-12 w-auto" />
            </div>

            {/* Previous Month Sales */}
            <div className="flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-gray-700">Previous Month Sales</p>
                <p className="text-2xl font-bold text-gray-900">{apiData.length}</p>
              </div>
              <img src={lastMonth} alt="Last Month" className="h-12 w-auto" />
            </div>
          </div>

          {/* Graph Section */}
          <p className="font-bold text-xl mb-3">Monthly Sales</p>
          <div className="h-64 bg-gray border border-gray-300 rounded-lg shadow flex items-center justify-center">
            Graph Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;