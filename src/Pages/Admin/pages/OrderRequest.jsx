// import React,{useState, useEffect} from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { div, nav } from "framer-motion/client";
// function Prakhar() {
//     const navigate = useNavigate();
//     const [apiData, setApiData] = useState([]);
//     // getting the data from the api
//   function getData(){
//     const data = axios.get("http://localhost:8080/api/public/orders/all")
//     .then((response) => {
//       console.log("Hiii ",response.data)
//       setApiData(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data", error);
//     });
//   }

// /* Grouping the orders according to delivery date and calolating total request */
// function groupOrdersByDeliveryDate(orders) {
//     const result = {};
  
//     orders.forEach(order => {
//       const date = order.deliveryDate.split('T')[0]; // extract YYYY-MM-DD
  
//       if (!result[date]) {
//         result[date] = {
//           deliveryDate: date,
//           Request: 0
//         };
//       }
  
//       result[date].Request += 1; // count the order as one request
//     });

//     console.log("Debugg ",Object.values(result))
//     return Object.values(result); // convert object to array
//   }
  
// /* Filtering only for 15 days */
// function getNext15DaysOrderSummary(groupedData) {
//     const today = new Date();
//     const result = [];
  
//     for (let i = 1; i <= 15; i++) {
//       const nextDate = new Date(today);
//       nextDate.setDate(today.getDate() + i);
//       const dateStr = nextDate.toISOString().split('T')[0];
//       const match = groupedData.find(item => item.deliveryDate === dateStr);
//       result.push({
//         deliveryDate: dateStr,
//         Request: match ? match.Request : 0
//       });
//     }
//     console.log("Debug 2", result)
//     return result;
//   }
//   const grouped = groupOrdersByDeliveryDate(apiData); 
//   const summary = getNext15DaysOrderSummary(grouped); 
//   console.log("Summary",summary);
  
//     useEffect(() => {
//       getData();
//     }
//     , []);
  
//     const today = new Date();
//     const formattedDate = today.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'long',
//     });

   
//     function convertDate(dateString) {
//       const options = { day: '2-digit', month: 'long' };
//       const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
//       const dateParts = formattedDate.split(" "); // ['14', 'April']
//       return dateParts;
//     }
    
    
    
//     return(
//       <div className="flex flex-col">
//       <div ><Navbar /></div>
//         <div className="flex">
//                 <Sidebar/>
//                 <div className="p-6 bg-gray-200 w-full min-h-screen">
//                 <h1 className="font-bold text-3xl text-black">Order Request</h1>
// <br />


//                 <div className="flex flex-col items-center  bg-gray-200 w-full">
//                     {/* <p className="text-white">{formattedDate}</p> */}
//                     <div className="grid grid-cols-5 gap-4 p-10 m-2">{summary.map((data)=>{
//                         return(
//                             <div className="w-40 text-center h-20 bg-sky-500/80 text-white rounded-lg cursor-pointer" onClick={()=>navigate("/admin-order-request-detail")}>
                                
//                                 <p>{convertDate(data.deliveryDate)[0]}</p>
//                                 <p>{convertDate(data.deliveryDate)[1]}</p>
//                                 <p>{data.Request}</p>
//                             </div>
//                         )
//                         })}
//                     </div>
                    
//                     </div>
//                 </div>
//         </div>
//         </div>) 
//   }
  
//   export default Prakhar;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Prakhar() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);

//   // Fetch data from API
//   function getData() {
//     axios
//       .get("http://localhost:8080/api/public/orders/all")
//       .then((response) => {
//         console.log("Hiii ", response.data);
//         setApiData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
//   }

//   // Grouping orders by delivery date
//   function groupOrdersByDeliveryDate(orders) {
//     const result = {};
//     orders.forEach((order) => {
//       const date = order.deliveryDate.split("T")[0]; // extract YYYY-MM-DD
//       if (!result[date]) {
//         result[date] = { deliveryDate: date, Request: 0 };
//       }
//       result[date].Request += 1;
//     });
//     console.log("Debugg ", Object.values(result));
//     return Object.values(result);
//   }

//   // Filtering for the next 15 days
//   function getNext15DaysOrderSummary(groupedData) {
//     const today = new Date();
//     const result = [];
//     for (let i = 1; i <= 15; i++) {
//       const nextDate = new Date(today);
//       nextDate.setDate(today.getDate() + i);
//        //const dateStr = nextDate.toISOString().split("T")[0];
//       const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
//       const dateStr = localDate.toISOString().split("T")[0];

//       const match = groupedData.find((item) => item.deliveryDate === dateStr);
//       result.push({
//         deliveryDate: dateStr,
//         Request: match ? match.Request : 0,
//       });
//     }
//     console.log("Debug 2", result);
//     return result;
//   }

//   const grouped = groupOrdersByDeliveryDate(apiData);
//   const summary = getNext15DaysOrderSummary(grouped);

//   useEffect(() => {
//     getData();
//   }, []);

//   function convertDate(dateString) {
//     const options = { day: "2-digit", month: "long" };
//     const formattedDate = new Date(dateString).toLocaleDateString("en-GB", options);
//     return formattedDate.split(" "); // ['14', 'April']
//   }

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <div className="p-6 bg-gray-200 w-full min-h-screen">
//           <h1 className="font-bold text-3xl text-black">Order Request</h1>
//           <br />

//           <div className="flex flex-col items-center bg-gray-200 w-full">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10 m-2">
//               {summary.map((data, index) => (
//                 <div
//                   key={index}
//                   onClick={() => navigate("/admin-order-request-detail")}
//                   className="flex flex-col justify-center items-center w-40 h-24 bg-sky-500 text-white rounded-xl shadow-md hover:bg-sky-700 cursor-pointer transition duration-300"
//                 >
//                   <p className="text-lg font-semibold">{convertDate(data.deliveryDate)[0]}</p>
//                   <p className="text-base">{convertDate(data.deliveryDate)[1]}</p>
//                   <p className="text-xl font-bold">{data.Request}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Prakhar;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Prakhar() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);

//   //Fetch data from API
//   function getData() {
//     axios
//       .get("http://localhost:8080/api/public/orders/all")
//       .then((response) => {
//         console.log("Hiii  check karne ke liye", response.data);
//         setApiData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
//   }

//   // Grouping orders by delivery date
//   function groupOrdersByDeliveryDate(orders) {
//     const result = {};
//     orders.forEach((order) => {
//       const date = order.deliveryDate.split("T")[0]; // extract YYYY-MM-DD
//       if (!result[date]) {
//         result[date] = { deliveryDate: date, Request: 0 };
//       }
//       result[date].Request += 1;
//     });
//     console.log("Debugg ", Object.values(result));
//     return Object.values(result);
//   }

//   // Filtering for the next 15 days
//   function getNext15DaysOrderSummary(groupedData) {
//     const today = new Date();
//     const result = [];
//     for (let i = 1; i <= 15; i++) {
//       const nextDate = new Date(today);
//       nextDate.setDate(today.getDate() + i);
//        //const dateStr = nextDate.toISOString().split("T")[0];
//       const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
//       const dateStr = localDate.toISOString().split("T")[0];

//       const match = groupedData.find((item) => item.deliveryDate === dateStr);
//       result.push({
//         deliveryDate: dateStr,
//         Request: match ? match.Request : 0,
//       });
//     }
//     console.log("Debug 2", result);
//     return result;
//   }

//   const grouped = groupOrdersByDeliveryDate(apiData);
//   const summary = getNext15DaysOrderSummary(grouped);

//   useEffect(() => {
//     getData();
//   }, []);

//   function convertDate(dateString) {
//     const options = { day: "2-digit", month: "long" };
//     const formattedDate = new Date(dateString).toLocaleDateString("en-GB", options);
//     return formattedDate.split(" "); // ['14', 'April']
//   }

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <div className="p-6 bg-gray-200 w-full min-h-screen">
//           <h1 className="font-bold text-3xl text-black">Order Request</h1>
//           <br />

//           <div className="flex flex-col items-center bg-gray-200 w-full">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10 m-2">
//               {summary.map((data, index) => (
//                 <div
//                   key={index}
//                   onClick={() => navigate("/admin-order-request-detail",{   state: {
//                     deliveryDate: data.deliveryDate,
//                     from: "admin-order-request"
//                   }
//                 })}
//                   className="flex flex-col justify-center items-center w-40 h-40 bg-sky-500 text-white rounded-xl shadow-md hover:bg-sky-700 cursor-pointer transition duration-300"
//                 >
//                   <p className="text-lg font-semibold text-black">{convertDate(data.deliveryDate)[0]}</p>
//                   <p className="text-base text-black">{convertDate(data.deliveryDate)[1]}</p>
//                   <p className="text-lg ">Pending:{data.Request}</p>
//                   <p className="text-lg ">Accepted:{data.Request}</p>
//                   <p className="text-lg ">Stock:{data.Request}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Prakhar;

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Prakhar() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); 


  function getData() {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/public/orders/all")
      .then((response) => setApiData(response.data))
      .catch((error) => console.error("Error fetching data", error))
      .finally(() => setLoading(false));;
  }


  function groupOrdersByDeliveryDate(orders) {
    const result = {};
    orders.forEach((order) => {
      const date = order.deliveryDate.split("T")[0];
      if (!result[date]) {
        result[date] = { deliveryDate: date, Request: 0 };
      }
      result[date].Request += 1;
    });
    return Object.values(result);
  }

  function getNext15DaysOrderSummary(groupedData) {
    const today = new Date();
    const result = [];
    for (let i = 1; i <= 15; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
      const dateStr = localDate.toISOString().split("T")[0];
      const match = groupedData.find((item) => item.deliveryDate === dateStr);
      result.push({
        deliveryDate: dateStr,
        Request: match ? match.Request : 0,
      });
    }
    return result;
  }

  useEffect(() => {
    getData();
  }, []);

  const grouped = groupOrdersByDeliveryDate(apiData);
  const summary = getNext15DaysOrderSummary(grouped);

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
              const capacity = data.deliveryDate === 1200;
              const available = capacity - data.Request;

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
                  <div className="flex  items-center gap-4">
                  {/* Circle with weekday and day */}
                  <div className="w-18 h-18 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-md">
                    <div className="text-xs">{weekday}</div>
                    <div className="text-2xl">{day}</div>
                  </div>

                  {/* Month and Year */}
                  <div className="mt-2 text-center flex flex-col justify-center">
                    <div className="text-2xl font-semibold text-gray-800">{month}</div>
                    <div className="text-xl text-gray-500">{year}</div>
                  </div>
                  </div>

                  {/* Order Details */}
                  <div className="mt-3 bg-gray-100 rounded-md px-4 py-2 w-full text-sm text-gray-800">
                    <p>
                      Total Order Request:{" "}
                      <span className="text-blue-600 font-semibold">{data.Request}</span>
                    </p>
                    <p>
                      Pending:{" "}
                      <span className="text-blue-600 font-semibold">{available}</span> 
                    </p>
                    <p>
                      Accepted:{" "}
                      <span className="text-blue-600 font-semibold">{capacity}</span> 
                    </p>
                    <p>
                      Available:{" "}
                      <span className="text-blue-600 font-semibold">{capacity}</span> blocks
                    </p>
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

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Prakhar() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state added

//   function getData() {
//     setLoading(true);
//     axios
//       .get("http://localhost:8080/api/public/orders/all")
//       .then((response) => setApiData(response.data))
//       .catch((error) => console.error("Error fetching data", error))
//       .finally(() => setLoading(false));
//   }

//   function groupOrdersByDeliveryDate(orders) {
//     const result = {};
//     orders.forEach((order) => {
//       const date = order.deliveryDate.split("T")[0];
//       if (!result[date]) {
//         result[date] = { deliveryDate: date, Request: 0 };
//       }
//       result[date].Request += 1;
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
//       });
//     }
//     return result;
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   const grouped = groupOrdersByDeliveryDate(apiData);
//   const summary = getNext15DaysOrderSummary(grouped);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
//               const capacity = 1200;
//               const available = capacity - data.Request;

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
//                   <div className="flex items-center gap-4">
//                     {/* Circle with weekday and day */}
//                     <div className="w-18 h-18 bg-blue-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-md">
//                       <div className="text-xs">{weekday}</div>
//                       <div className="text-2xl">{day}</div>
//                     </div>

//                     {/* Month and Year */}
//                     <div className="mt-2 text-center flex flex-col justify-center">
//                       <div className="text-2xl font-semibold text-gray-800">{month}</div>
//                       <div className="text-xl text-gray-500">{year}</div>
//                     </div>
//                   </div>

//                   {/* Order Details */}
//                   <div className="mt-3 bg-gray-100 rounded-md px-4 py-2 w-full text-sm text-gray-800">
//                     <p>
//                       Total Order Request:{" "}
//                       <span className="text-blue-600 font-semibold">{data.Request}</span>
//                     </p>
//                     <p>
//                       Pending:{" "}
//                       <span className="text-blue-600 font-semibold">{available}</span>
//                     </p>
//                     <p>
//                       Accepted:{" "}
//                       <span className="text-blue-600 font-semibold">{capacity}</span>
//                     </p>
//                     <p>
//                       Available:{" "}
//                       <span className="text-blue-600 font-semibold">{capacity}</span> blocks
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
