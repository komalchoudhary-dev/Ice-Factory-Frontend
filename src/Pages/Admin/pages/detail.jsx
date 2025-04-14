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




import Sidebar from '../components/Sidebar'; // ✅ fix path
import Navbar from '../components/Navbar'; // ✅ fix path
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Detail() {
    const location = useLocation();
    const data = location.state;
    console.log("Data from previous page: ", data);
    const date = new Date(data);

const options = {
  weekday: "long",  // 
  day: "2-digit",   // '28'
  month: "long",    // 'April'
  year: "numeric"   // '2025'
};

const formattedDate = date.toLocaleDateString("en-GB", options);
   

   const [apiData, setApiData] = useState([]);
   
  // Fetch data from API
  function getData() {
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${data}`)
      .then((response) => {
        setApiData(response.data);
        console.log("Aaj ka delivery"+{data}, response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }
  useEffect(() => {
      getData();
    }, []);

    const handleClick = () => {
        console.log("Accepted!");
      };
      
      const handleReject = () => {
        console.log("Rejected!");
      };
      const Available = () => {
        let amt = 0;
        for (let i = 0; i < apiData.length; i++) {
          if (apiData[i].status === "confirmed") {
            amt += apiData[i].quantity;
          }
        }
        console.log("Available Stock: ", 1400-amt);
        return 1400-amt;
      };
      

    return(<div className="flex flex-col">
        <Navbar/>
        <div className ='flex'>
            <Sidebar/>
            <div className="flex flex-col w-full p-2">
                       <div className=' bg-white-200 w-full'>
                       <p className='text-2xl font-bold     items-center justify-left px-4'>Delivery Date -{formattedDate}</p>
                       <div className="grid grid-cols-3 gap-8 p-4">
                        <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
                        <div className="text-center">
                             <p className="font-bold text-sm">Accepted</p>{apiData.filter(item => item.status === "confirmed").length}
                            </div>
                        </div> 
                        <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
                           <div className="text-center">
                             <p className="font-bold text-sm">Pending</p>{apiData.filter(item => item.status === "pending").length}
                            </div>
                        </div>
                         <div className="w-80 h-16 bg-blue-200 border border-black rounded-md text-black  items-center justify-between px-4">
                           <div className="text-center">
                             <p className="font-bold text-sm">Available Stock</p>{Available()}
                           </div>
                         </div>
                         
                       </div>
                        </div>
                        <br/>
                       <div className=' w-full'>
                        
                       <h1 className="text-2xl font-bold">Order Accepted</h1>
                       <div className="overflow-x-auto rounded shadow">
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
                {apiData.map((item, index) => (
                   item.status === "confirmed" && (
                   <tr key={index} className="text-center border-t">
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
                     )
               ))}
              </tbody>
            </table>
          </div>

                       </div>
                       <br/>
                       <div className='  w-full'>
                          <h1 className="text-2xl font-bold">Order Pending</h1>
                          <div className="overflow-x-auto rounded shadow">
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
                {apiData.map((item, index) => (
                  item.status === "pending" && (
                  <tr key={index} className="text-center border-t">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{item.orderId}</td>
                    <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
                    <td className="py-2 px-4 border">{item.quantity}</td>
                    <td className="py-2 px-4 border">{item.street}, {item.city} - {item.pincode}</td>
                    <td className="py-2 px-4 border">{item.phone}</td>
                    <td className="py-2 px-4 border capitalize">{item.status}</td>
                    <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{item.totalAmount}</td>
                    <td className="py-2 px-8 border">
                                 <button
                                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                                       onClick={() => handleClick()}
                                       >Accept
                                 </button>
                                 <button
                                       className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded ml-2"
                                       onClick={() => handleReject()}
                                 > Reject
                                 </button>
                                </td>

                  </tr>)
                ))}
              </tbody>
            </table>
            </div>
                       </div>
            </div>
        
        </div>
    </div>)
}

export default Detail;
