// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";

// function Prakhar() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true); 


//   function getData() {
//     setLoading(true);
//     axios
//       .get("http://localhost:8080/api/public/orders/all")
//       .then((response) => setApiData(response.data))
//       .catch((error) => console.error("Error fetching data", error))
//       .finally(() => setLoading(false));;
//   }
  
//   console.log("Hiii I am apiData ", apiData);
// //   // function groupOrdersByDeliveryDate(orders) {
// //   //   const result = {};
// //   //   orders.forEach((order) => {
// //   //     const date = order.deliveryDate.split("T")[0];
// //   //     if (!result[date]) {
// //   //       result[date] = { deliveryDate: date, Request: 0 };
// //   //     }
// //   //     result[date].Request += 1;
// //   //   });
// //   //   return Object.values(result);
// //   // }
// //   function groupOrdersByDeliveryDate(orders) {
// //   const result = {};

// //   orders.forEach((order) => {
// //     const date = order.deliveryDate.split("T")[0];

// //     if (!result[date]) {
// //       result[date] = {
// //         deliveryDate: date,
// //         Request: 0,
// //         orders: []  // store all orders for that day
// //       };
// //     }

// //     result[date].Request += 1;
// //     result[date].orders.push(order);
// //   });

// //   return Object.values(result);
// // }


// //   function getNext15DaysOrderSummary(groupedData) {
// //     const today = new Date();
// //     const result = [];
// //     for (let i = 1; i <= 15; i++) {
// //       const nextDate = new Date(today);
// //       nextDate.setDate(today.getDate() + i);
// //       const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
// //       const dateStr = localDate.toISOString().split("T")[0];
// //       const match = groupedData.find((item) => item.deliveryDate === dateStr);
// //       result.push({
// //         deliveryDate: dateStr,
// //         Request: match ? match.Request : 0,
// //       });
// //     }
// //     return result;
// //   }

// function groupOrdersByDeliveryDate(orders) {
//     const result = {};
//     orders.forEach((order) => {
//       const date = order.deliveryDate.split("T")[0];
//       if (!result[date]) {
//         result[date] = {
//           deliveryDate: date,
//           Request: 0,
//           Pending: 0,
//           Confirmed: 0,
//           ConfirmedQuantity: 0,
//         };
//       }

//       result[date].Request += 1;

//       if (order.status === "pending") {
//         result[date].Pending += 1;
//       }

//       if (order.status === "confirmed") {
//         result[date].Confirmed += 1;
//         result[date].ConfirmedQuantity += order.quantity || 0;
//       }
//     });

//     return Object.values(result);
//   }

//   function getNext15DaysOrderSummary(groupedData) {
//     const today = new Date();
//     const result = [];
//     for (let i = 1; i <= 15; i++) {
//       const nextDate = new Date(today);
//       nextDate.setDate(today.getDate() + i);
//       const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
//       const dateStr = localDate.toISOString().split("T")[0];
//       const match = groupedData.find((item) => item.deliveryDate === dateStr);
//       result.push({
//         deliveryDate: dateStr,
//         Request: match ? match.Request : 0,
//         Pending: match ? match.Pending : 0,
//         Confirmed: match ? match.Confirmed : 0,
//         ConfirmedQuantity: match ? match.ConfirmedQuantity : 0,
//       });
//     }
//     return result;
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   const grouped = groupOrdersByDeliveryDate(apiData);
//   const summary = getNext15DaysOrderSummary(grouped);

//   console.log("Hiii I am grouped ", grouped);
//   console.log("Hiii I am summary ", summary);
//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <div className="flex flex-1">
//           <Sidebar />
//           <div className="flex flex-1 items-center justify-center bg-gray-100">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <div className="p-6 bg-gray-200/40 w-full min-h-screen">
//           <h1 className="font-bold text-3xl text-black">Order Request</h1>
//           <br />
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {summary.map((data, index) => {
//               const dateObj = new Date(data.deliveryDate);
//               const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
//               const day = dateObj.getDate();
//               const month = dateObj.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
//               const year = dateObj.getFullYear();
//               const capacity = 1800;
//               const available = capacity - data.ConfirmedQuantity;

//               return (
//                 <div
//                   key={index}
//                   onClick={() =>
//                     navigate("/admin-order-request-detail", {
//                       state: {
//                         deliveryDate: data.deliveryDate,
//                         from: "admin-order-request",
//                       },
//                     })
//                   }
//                   className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer p-4 flex flex-col items-center"
//                 >
//                   <div className="flex  items-center gap-4">
//                   {/* Circle with weekday and day */}
//                   <div className="w-18 h-18 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-md">
//                     <div className="text-xs">{weekday}</div>
//                     <div className="text-2xl">{day}</div>
//                   </div>

//                   {/* Month and Year */}
//                   <div className="mt-2 text-center flex flex-col justify-center">
//                     <div className="text-2xl font-semibold text-gray-800">{month}</div>
//                     <div className="text-xl text-gray-500">{year}</div>
//                   </div>
//                   </div>

//                   {/* Order Details */}
//                   <div className="mt-3 bg-gray-100 rounded-md px-4 py-2 w-full text-sm text-gray-800">
//                     <p>
//                       Total Order Request:{" "}
//                       <span className="text-blue-600 font-semibold">{data.Request}</span>
//                     </p>
//                     <p>
//                       Pending:{" "}
//                       <span className="text-blue-600 font-semibold">{data.Pending}</span> 
//                     </p>
//                     <p>
//                       Accepted:{" "}
//                       <span className="text-blue-600 font-semibold">{data.Confirmed}</span> 
//                     </p>
//                     <p>
//                       Available:{" "}
//                       <span className="text-blue-600 font-semibold">{available}</span> blocks
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Prakhar;


import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Prakhar() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const capacity = 1200;

  useEffect(() => {
    fetchNext15DaysData();
  }, []);

  function getNext15Dates() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
      const dateStr = localDate.toISOString().split("T")[0];
      dates.push(dateStr);
    }
    return dates;
  }

  async function fetchNext15DaysData() {
    const dates = getNext15Dates();

    try {
      const promises = dates.map(async (date) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${date}`);
          const orders = response.data;

          const pendingCount = orders.filter(order => order.status === "pending").length;
          const confirmedOrders = orders.filter(order => order.status === "confirmed");
          const confirmedQuantity = confirmedOrders.reduce((sum, order) => sum + order.quantity, 0);

          return {
            deliveryDate: date,
            totalOrders: orders.length,
            pending: pendingCount,
            confirmed: confirmedOrders.length,
            confirmedQuantity,
            available: capacity - confirmedQuantity
          };
        } catch (error) {
          console.error(`Error fetching data for ${date}`, error);
          return {
            deliveryDate: date,
            totalOrders: 0,
            pending: 0,
            confirmed: 0,
            confirmedQuantity: 0,
            available: capacity
          };
        }
      });

      const results = await Promise.all(promises);
      setSummary(results);
    } catch (error) {
      console.error("Unexpected error in fetchNext15DaysData", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-1 items-center justify-center bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-6 bg-gray-200/40 w-full min-h-screen">
          <h1 className="font-bold text-3xl text-black">Order Request</h1>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {summary.map((data, index) => {
              const dateObj = new Date(data.deliveryDate);
              const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
              const day = dateObj.getDate();
              const month = dateObj.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
              const year = dateObj.getFullYear();

              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate("/admin-order-request-detail", {
                      state: {
                        deliveryDate: data.deliveryDate,
                        from: "admin-order-request",
                      },
                    })
                  }
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer p-4 flex flex-col items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-18 h-18 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-md">
                      <div className="text-xs">{weekday}</div>
                      <div className="text-2xl">{day}</div>
                    </div>
                    <div className="mt-2 text-center flex flex-col justify-center">
                      <div className="text-2xl font-semibold text-gray-800">{month}</div>
                      <div className="text-xl text-gray-500">{year}</div>
                    </div>
                  </div>

                  <div className="mt-3 bg-gray-100 rounded-md px-4 py-2 w-full text-sm text-gray-800">
                    <p>Total Order Request: <span className="text-blue-600 font-semibold">{data.totalOrders}</span></p>
                    <p>Pending: <span className="text-blue-600 font-semibold">{data.pending}</span></p>
                    <p>Confirmed: <span className="text-blue-600 font-semibold">{data.confirmed}</span></p>
                    <p>Rejected: <span className="text-blue-600 font-semibold">{data.totalOrders-data.confirmed-data.pending}</span></p>
                    <p>Available: <span className="text-blue-600 font-semibold">{data.available}</span> blocks</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prakhar;
