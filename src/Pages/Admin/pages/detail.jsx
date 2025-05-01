// import Sidebar from '../components/Sidebar'; // ✅ fix path
// import Navbar from '../components/Navbar'; // ✅ fix path
// import React from 'react';
// import {useState,useEffect} from 'react';
// import axios from 'axios';

// function Detail() {
//     const today = new Date();
//     const futureDate = new Date();
// futureDate.setDate(today.getDate()+3);
// console.log("Future date: ", futureDate);
//     const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
//     const ModifiedDate = futureDate.toLocaleDateString('en-GB', options);
//     // Get today's date in YYYY-MM-DD format
    
//   //const formattedDate = futureDate.toISOString().split("T")[0];
//   const localFutureDate = new Date(futureDate.getTime() - futureDate.getTimezoneOffset() * 60000);
// const formattedDate = localFutureDate.toISOString().split("T")[0];

//    const [apiData, setApiData] = useState([]);
   
//   // Fetch data from API
//   function getData() {
//     axios
//       .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`)
//       .then((response) => {
//         setApiData(response.data);
//         console.log("Today's delivery data: ", response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
//   }
//   useEffect(() => {
//       getData();
//     }, []);

//     const handleClick = () => {
//         console.log("Accepted!");
//       };
      
//       const handleReject = () => {
//         console.log("Rejected!");
//       };
//       const Available = () => {
//         let amt = 0;
//         for (let i = 0; i < apiData.length; i++) {
//           if (apiData[i].status === "confirmed") {
//             amt += apiData[i].quantity;
//           }
//         }
//         console.log("Available Stock: ", 1400-amt);
//         return 1400-amt;
//       };
      

//     return(<div className="flex flex-col">
//         <Navbar/>
//         <div className ='flex'>
//             <Sidebar/>
//             <div className="flex flex-col w-full p-2">
//                        <div className=' bg-white-200 w-full'>
//                        <p className='text-2xl font-bold     items-center justify-left px-4'>Delivery Date -{ModifiedDate}</p>
//                        <div className="grid grid-cols-3 gap-8 p-4">
//                         <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
//                         <div className="text-center">
//                              <p className="font-bold text-sm">Accepted</p>{apiData.filter(item => item.status === "confirmed").length}
//                             </div>
//                         </div> 
//                         <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
//                            <div className="text-center">
//                              <p className="font-bold text-sm">Pending</p>{apiData.filter(item => item.status === "pending").length}
//                             </div>
//                         </div>
//                          <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
//                            <div className="text-center">
//                              <p className="font-bold text-sm">Available Stock</p>{Available()}
//                            </div>
//                          </div>
                         
//                        </div>
//                         </div>
//                         <br/>
//                        <div className=' w-full'>
                        
//                        <h1 className="text-2xl font-bold">Order Accepted</h1>
//                        <div className="overflow-x-auto rounded shadow">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-sky-200 text-black">
//                 <tr>
//                   <th className="py-2 px-4 border">#</th>
//                   <th className="py-2 px-4 border">Order ID</th>
//                   <th className="py-2 px-4 border">Customer Name</th>
//                   <th className="py-2 px-4 border">Quantity</th>
//                   <th className="py-2 px-4 border">Address</th>
//                   <th className="py-2 px-4 border">Phone</th>
//                   <th className="py-2 px-4 border">Status</th>
//                   <th className="py-2 px-4 border">Delivery Date</th>
//                   <th className="py-2 px-4 border">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {apiData.map((item, index) => (
//                    item.status === "confirmed" && (
//                    <tr key={index} className="text-center border-t">
//                               <td className="py-2 px-4 border">{index + 1}</td>
//                               <td className="py-2 px-4 border">{item.orderId}</td>
//                               <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
//                               <td className="py-2 px-4 border">{item.quantity}</td>
//                               <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
//                               <td className="py-2 px-4 border">{item.phone}</td>
//                               <td className="py-2 px-4 border capitalize">{item.status}</td>
//                               <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
//                               <td className="py-2 px-4 border">{item.totalAmount}</td>
//                     </tr>
//                      )
//                ))}
//               </tbody>
//             </table>
//           </div>

//                        </div>
//                        <br/>
//                        <div className='  w-full'>
//                           <h1 className="text-2xl font-bold">Order Pending</h1>
//                           <div className="overflow-x-auto rounded shadow">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-sky-200 text-black">
//                 <tr>
//                   <th className="py-2 px-4 border">#</th>
//                   <th className="py-2 px-4 border">Order ID</th>
//                   <th className="py-2 px-4 border">Customer Name</th>
//                   <th className="py-2 px-4 border">Quantity</th>
//                   <th className="py-2 px-4 border">Address</th>
//                   <th className="py-2 px-4 border">Phone</th>
//                   <th className="py-2 px-4 border">Status</th>
//                   <th className="py-2 px-4 border">Delivery Date</th>
//                   <th className="py-2 px-4 border">Amount</th>
//                   <th className="py-2 px-4 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {apiData.map((item, index) => (
//                   item.status === "pending" && (
//                   <tr key={index} className="text-center border-t">
//                     <td className="py-2 px-4 border">{index + 1}</td>
//                     <td className="py-2 px-4 border">{item.orderId}</td>
//                     <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
//                     <td className="py-2 px-4 border">{item.quantity}</td>
//                     <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
//                     <td className="py-2 px-4 border">{item.phone}</td>
//                     <td className="py-2 px-4 border capitalize">{item.status}</td>
//                     <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
//                     <td className="py-2 px-4 border">{item.totalAmount}</td>
//                     <td className="py-2 px-8 border">
//                                  <button
//                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
//                                        onClick={() => handleClick()}
//                                        >Accept
//                                  </button>
//                                  <button
//                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded ml-2"
//                                        onClick={() => handleReject()}
//                                  > Reject
//                                  </button>
//                                 </td>

//                   </tr>)
//                 ))}
//               </tbody>
//             </table>
//             </div>
//                        </div>
//             </div>
        
//         </div>
//     </div>)
// }

// export default Detail;




// import Sidebar from '../components/Sidebar'; // ✅ fix path
// import Navbar from '../components/Navbar'; // ✅ fix path
// import React from 'react';
// import {useState,useEffect} from 'react';
// import axios from 'axios';
// import { useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// function Detail() {
//     // let data=new Date(); 
//     const location = useLocation();
//     const data = location.state;
//     const navigate = useNavigate();
//     console.log("Data from previous page: ", data);
//     const date = new Date(data);
//     if (!data || data.from !== "admin-order-request") {
//       // Redirect if not accessed via the proper route
//      navigate("/admin-order-request")
//     }

// const options = {
//   weekday: "long",  // 
//   day: "2-digit",   // '28'
//   month: "long",    // 'April'
//   year: "numeric"   // '2025'
// };

// const info = data?data.deliveryDate:null
// const formattedDate = new Date(info).toLocaleDateString("en-GB", options);
   

//    const [apiData, setApiData] = useState([]);
   
//   // Fetch data from API
//   function getData() {
//     axios
//       .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${data.deliveryDate}`)
//       .then((response) => {
//         setApiData(response.data);
//         console.log("Aaj ka delivery ",data.deliveryDate, response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
//   }
//   useEffect(() => {
//       getData();
//     }, []);

//     const handleClick = () => {
//         console.log("Accepted!");
//       };
      
//       const handleReject = () => {
//         console.log("Rejected!");
//       };
//       const Available = () => {
//         let amt = 0;
//         for (let i = 0; i < apiData.length; i++) {
//           if (apiData[i].status === "confirmed") {
//             amt += apiData[i].quantity;
//           }
//         }
//         console.log("Available Stock: ", 1400-amt);
//         return 1400-amt;
//       };
      

//     return(<div className="flex flex-col">
//         <Navbar/>
//         <div className ='flex'>
//             <Sidebar/>
//             <div className="flex flex-col w-full p-2">
//                        <div className=' bg-white-200 w-full'>
//                        <p className='text-2xl font-bold     items-center justify-left px-4'>Delivery Date -{formattedDate}</p>
//                        <div className="grid grid-cols-3 gap-8 p-4">
//                         <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
//                         <div className="text-center">
//                              <p className="font-bold text-sm">Accepted</p>{apiData.filter(item => item.status === "confirmed").length}
//                             </div>
//                         </div> 
//                         <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
//                            <div className="text-center">
//                              <p className="font-bold text-sm">Pending</p>{apiData.filter(item => item.status === "pending").length}
//                             </div>
//                         </div>
//                          <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
//                            <div className="text-center">
//                              <p className="font-bold text-sm">Available Stock</p>{Available()}
//                            </div>
//                          </div>
                         
//                        </div>
//                         </div>
//                         <br/>
//                        <div className=' w-full'>
                        
//                        <h1 className="text-2xl font-bold">Order Accepted</h1>
//                        <div className="overflow-x-auto rounded shadow">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-sky-200 text-black">
//                 <tr>
//                   <th className="py-2 px-4 border">#</th>
//                   <th className="py-2 px-4 border">Order ID</th>
//                   <th className="py-2 px-4 border">Customer Name</th>
//                   <th className="py-2 px-4 border">Quantity</th>
//                   <th className="py-2 px-4 border">Address</th>
//                   <th className="py-2 px-4 border">Phone</th>
//                   <th className="py-2 px-4 border">Status</th>
//                   <th className="py-2 px-4 border">Delivery Date</th>
//                   <th className="py-2 px-4 border">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {apiData.map((item, index) => (
//                    item.status === "confirmed" && (
//                    <tr key={index} className="text-center border-t">
//                               <td className="py-2 px-4 border">{index + 1}</td>
//                               <td className="py-2 px-4 border">{item.orderId}</td>
//                               <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
//                               <td className="py-2 px-4 border">{item.quantity}</td>
//                               <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
//                               <td className="py-2 px-4 border">{item.phone}</td>
//                               <td className="py-2 px-4 border capitalize">{item.status}</td>
//                               <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
//                               <td className="py-2 px-4 border">{item.totalAmount}</td>
//                     </tr>
//                      )
//                ))}
//               </tbody>
//             </table>
//           </div>

//                        </div>
//                        <br/>
//                        <div className='  w-full'>
//                           <h1 className="text-2xl font-bold">Order Pending</h1>
//                           <div className="overflow-x-auto rounded shadow">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-sky-200 text-black">
//                 <tr>
//                   <th className="py-2 px-4 border">#</th>
//                   <th className="py-2 px-4 border">Order ID</th>
//                   <th className="py-2 px-4 border">Customer Name</th>
//                   <th className="py-2 px-4 border">Quantity</th>
//                   <th className="py-2 px-4 border">Address</th>
//                   <th className="py-2 px-4 border">Phone</th>
//                   <th className="py-2 px-4 border">Status</th>
//                   <th className="py-2 px-4 border">Delivery Date</th>
//                   <th className="py-2 px-4 border">Amount</th>
//                   <th className="py-2 px-4 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {apiData.map((item, index) => (
//                   item.status === "pending" && (
//                   <tr key={index} className="text-center border-t">
//                     <td className="py-2 px-4 border">{index + 1}</td>
//                     <td className="py-2 px-4 border">{item.orderId}</td>
//                     <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
//                     <td className="py-2 px-4 border">{item.quantity}</td>
//                     <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
//                     <td className="py-2 px-4 border">{item.phone}</td>
//                     <td className="py-2 px-4 border capitalize">{item.status}</td>
//                     <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
//                     <td className="py-2 px-4 border">{item.totalAmount}</td>
//                     <td className="py-2 px-8 border">
//                                  <button
//                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
//                                        onClick={() => handleClick()}
//                                        >Accept
//                                  </button>
//                                  <button
//                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded ml-2"
//                                        onClick={() => handleReject()}
//                                  > Reject
//                                  </button>
//                                 </td>

//                   </tr>)
//                 ))}
//               </tbody>
//             </table>
//             </div>
//                        </div>
//             </div>
        
//         </div>
//     </div>)
// }

// export default Detail;





// import Sidebar from '../components/Sidebar'; // ✅ fix path
// import Navbar from '../components/Navbar'; // ✅ fix path
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Detail() {
//   const location = useLocation();
//   const data = location.state;
//   const navigate = useNavigate();

//   if (!data || data.from !== "admin-order-request") {
//     navigate("/admin-order-request");
//   }

//   const options = {
//     weekday: "long",
//     day: "2-digit",
//     month: "long",
//     year: "numeric"
//   };

//   const info = data ? data.deliveryDate : null;
//   const formattedDate = new Date(info).toLocaleDateString("en-GB", options);

//   const [apiData, setApiData] = useState([]);

//   function getData() {
//     axios
//       .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${data.deliveryDate}`)
//       .then((response) => {
//         setApiData(response.data);
//         console.log("Fetched delivery data: ", response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleClick = (orderId) => {
//     const confirmed = window.confirm("Are you sure you want to accept this order?");
//     if (!confirmed) return;

//     axios
//       .put(`http://localhost:8080/api/public/orders/status/${orderId}/confirmed`)
//       .then((response) => {
//         console.log("Order accepted:", response.data);
//         getData(); // Refresh data
//       })
//       .catch((error) => {
//         console.error("Error accepting order:", error);
//       });
//   };

//   const handleReject = (orderId) => {
//     const confirmed = window.confirm("Are you sure you want to reject this order?");
//     if (!confirmed) return;

//     axios
//       .put(`http://localhost:8080/api/public/orders/status/${orderId}/rejected`)
//       .then((response) => {
//         console.log("Order rejected:", response.data);
//         getData(); // Refresh data
//       })
//       .catch((error) => {
//         console.error("Error rejecting order:", error);
//       });
//   };

//   const Available = () => {
//     let amt = 0;
//     for (let i = 0; i < apiData.length; i++) {
//       if (apiData[i].status === "confirmed") {
//         amt += apiData[i].quantity;
//       }
//     }
//     return 1400 - amt;
//   };

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//       <div className='flex'>
//         <Sidebar />
//         <div className="flex flex-col w-full p-2">
//           <div className='bg-white-200 w-full'>
//             <p className='text-2xl font-bold px-4'>Delivery Date - {formattedDate}</p>
//             <div className="grid grid-cols-3 gap-8 p-4">
//               <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black px-4 text-center">
//                 <p className="font-bold text-sm">Accepted</p>
//                 {apiData.filter(item => item.status === "confirmed").length}
//               </div>
//               <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black px-4 text-center">
//                 <p className="font-bold text-sm">Pending</p>
//                 {apiData.filter(item => item.status === "pending").length}
//               </div>
//               <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black px-4 text-center">
//                 <p className="font-bold text-sm">Available Stock</p>
//                 {Available()}
//               </div>
//             </div>
//           </div>

//           <br />

//           <div className='w-full'>
//             <h1 className="text-2xl font-bold">Order Accepted</h1>
//             <div className="overflow-x-auto rounded shadow">
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead className="bg-sky-200 text-black">
//                   <tr>
//                     <th className="py-2 px-4 border">#</th>
//                     <th className="py-2 px-4 border">Order ID</th>
//                     <th className="py-2 px-4 border">Customer Name</th>
//                     <th className="py-2 px-4 border">Quantity</th>
//                     <th className="py-2 px-4 border">Address</th>
//                     <th className="py-2 px-4 border">Phone</th>
//                     <th className="py-2 px-4 border">Status</th>
//                     <th className="py-2 px-4 border">Delivery Date</th>
//                     <th className="py-2 px-4 border">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {apiData.map((item, index) =>
//                     item.status === "confirmed" && (
//                       <tr key={index} className="text-center border-t">
//                         <td className="py-2 px-4 border">{index + 1}</td>
//                         <td className="py-2 px-4 border">{item.orderId}</td>
//                         <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
//                         <td className="py-2 px-4 border">{item.quantity}</td>
//                         <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
//                         <td className="py-2 px-4 border">{item.phone}</td>
//                         <td className="py-2 px-4 border capitalize">{item.status}</td>
//                         <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
//                         <td className="py-2 px-4 border">{item.totalAmount}</td>
//                       </tr>
//                     )
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <br />

//           <div className='w-full'>
//             <h1 className="text-2xl font-bold">Order Pending</h1>
//             <div className="overflow-x-auto rounded shadow">
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead className="bg-sky-200 text-black">
//                   <tr>
//                     <th className="py-2 px-4 border">#</th>
//                     <th className="py-2 px-4 border">Order ID</th>
//                     <th className="py-2 px-4 border">Customer Name</th>
//                     <th className="py-2 px-4 border">Quantity</th>
//                     <th className="py-2 px-4 border">Address</th>
//                     <th className="py-2 px-4 border">Phone</th>
//                     <th className="py-2 px-4 border">Status</th>
//                     <th className="py-2 px-4 border">Delivery Date</th>
//                     <th className="py-2 px-4 border">Amount</th>
//                     <th className="py-2 px-4 border">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {apiData.map((item, index) =>
//                     item.status === "pending" && (
//                       <tr key={index} className="text-center border-t">
//                         <td className="py-2 px-4 border">{index + 1}</td>
//                         <td className="py-2 px-4 border">{item.orderId}</td>
//                         <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
//                         <td className="py-2 px-4 border">{item.quantity}</td>
//                         <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
//                         <td className="py-2 px-4 border">{item.phone}</td>
//                         <td className="py-2 px-4 border capitalize">{item.status}</td>
//                         <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
//                         <td className="py-2 px-4 border">{item.totalAmount}</td>
//                         <td className="py-2 px-8 border">
//                           <button
//                             className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
//                             onClick={() => handleClick(item.orderId)}
//                           >Accept</button>
//                           <button
//                             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded ml-2"
//                             onClick={() => handleReject(item.orderId)}
//                           >Reject</button>
//                         </td>
//                       </tr>
//                     )
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Detail;


import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Detail() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const date = new Date(data);
  if (!data || data.from !== "admin-order-request") {
    navigate("/admin-order-request");
  }

  const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
  const info = data ? data.deliveryDate : null;
  const formattedDate = new Date(info).toLocaleDateString("en-GB", options);

  const [apiData, setApiData] = useState([]);

  // Fetch API data
  function getData() {
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${data.deliveryDate}`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClick = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to accept this order?");
    if (!confirmed) return;

    try {
      await axios.put(`http://localhost:8080/api/public/orders/status/${orderId}/confirmed`);
      getData();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to reject this order?");
    if (!confirmed) return;

    try {
      await axios.put(`http://localhost:8080/api/public/orders/status/${orderId}/rejected`);
      getData();
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const Available = () => {
    let amt = 0;
    for (let i = 0; i < apiData.length; i++) {
      if (apiData[i].status === "confirmed") {
        amt += apiData[i].quantity;
      }
    }
    return 1400 - amt;
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full ">
          <div className='bg-white-200 w-full'>
            <p className='text-2xl font-bold px-4'>Delivery Date - {formattedDate}</p>
            <div className="grid grid-cols-4 gap-8 px-6">
              <div className="w-64 h-16 bg-blue-500 border border-black rounded-md text-white text-center">
                <p className="font-bold text-sm">Accepted</p>
                {apiData.filter(item => item.status === "confirmed").length}
              </div>
              <div className="w-64 h-16 bg-blue-500 border border-black rounded-md text-white text-center">
                <p className="font-bold text-sm">Rejected</p>
                {apiData.filter(item => item.status === "rejected").length}
              </div>
              <div className="w-64 h-16 bg-blue-500 border border-black rounded-md text-white text-center">
                <p className="font-bold text-sm">Pending</p>
                {apiData.filter(item => item.status === "pending").length}
              </div>
              <div className="w-64 h-16 bg-blue-500 border border-black rounded-md text-white text-center">
                <p className="font-bold text-sm">Available Stock</p>
                {Available()}
              </div>
            </div>
          </div>

          {/* Accepted Orders Table */}
          <h1 className=" px-6 text-2xl font-bold mt-4">Order Accepted</h1>
          <div className="  px-6 overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-sky-200 text-black">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Order ID</th>
                  <th className="py-2 px-4 border">Customer Name</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Delivery Date</th>
                  <th className="py-2 px-4 border">Amount</th>
                </tr>
              </thead>
              <tbody>
              {apiData
    .filter(item => item.status === "confirmed")
    .map((item, index) => (
      <tr key={item.orderId} className="text-center border-t">
        <td className="py-2 px-4 border">{index + 1}</td> 
        <td className="py-2 px-4 border">{item.orderId}</td>
        <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
        <td className="py-2 px-4 border">{item.quantity}</td>
        <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
        <td className="py-2 px-4 border">{item.phone}</td>
        <td className="py-2 px-4 border capitalize">{item.status}</td>
        <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
        <td className="py-2 px-4 border">{item.totalAmount}</td>
      </tr>
  ))}
              </tbody>
            </table>
          </div>
          {/* Accepted Rejected Table */}
          <h1 className=" px-6 text-2xl font-bold mt-6">Order Rejected</h1>
          <div className=" px-6 overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-sky-200 text-black">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Order ID</th>
                  <th className="py-2 px-4 border">Customer Name</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Delivery Date</th>
                  <th className="py-2 px-4 border">Amount</th>
                </tr>
              </thead>
              <tbody>
  {apiData
    .filter(item => item.status === "rejected")
    .map((item, index) => (
      <tr key={item.orderId} className="text-center border-t">
        <td className="py-2 px-4 border">{index + 1}</td> {/* Correct serial number */}
        <td className="py-2 px-4 border">{item.orderId}</td>
        <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
        <td className="py-2 px-4 border">{item.quantity}</td>
        <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
        <td className="py-2 px-4 border">{item.phone}</td>
        <td className="py-2 px-4 border capitalize">{item.status}</td>
        <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
        <td className="py-2 px-4 border">{item.totalAmount}</td>
      </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* Pending Orders Table */}
          <h1 className="px-6 text-2xl font-bold mt-6">Order Pending</h1>
          <div className=" px-6 overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-sky-200 text-black">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Order ID</th>
                  <th className="py-2 px-4 border">Customer Name</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Delivery Date</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
  {apiData.filter(item => item.status === "pending").length === 0 ? (
    <tr>
      <td colSpan="10" className="text-center py-4 text-gray-500 font-semibold">
        No order pending
      </td>
    </tr>
  ) : (
    apiData
      .filter(item => item.status === "pending")
      .map((item, index) => (
        <tr key={item.orderId} className="text-center border-t">
          <td className="py-2 px-4 border">{index + 1}</td>
          <td className="py-2 px-4 border">{item.orderId}</td>
          <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
          <td className="py-2 px-4 border">{item.quantity}</td>
          <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
          <td className="py-2 px-4 border">{item.phone}</td>
          <td className="py-2 px-4 border capitalize">{item.status}</td>
          <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
          <td className="py-2 px-4 border">{item.totalAmount}</td>
          <td className="py-2 px-4 border">
            <div className='flex flex cols'>
            <div><button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
              onClick={() => handleClick(item.orderId)}
            >
              Accept
            </button></div>
            <div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded ml-2"
              onClick={() => handleReject(item.orderId)}
            >
              Reject
            </button>
            </div>
            </div>
          </td>
        </tr>
      ))
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
