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

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Prakhar() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  // Fetch data from API
  function getData() {
    axios
      .get("http://localhost:8080/api/public/orders/all")
      .then((response) => {
        console.log("Hiii ", response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  // Grouping orders by delivery date
  function groupOrdersByDeliveryDate(orders) {
    const result = {};
    orders.forEach((order) => {
      const date = order.deliveryDate.split("T")[0]; // extract YYYY-MM-DD
      if (!result[date]) {
        result[date] = { deliveryDate: date, Request: 0 };
      }
      result[date].Request += 1;
    });
    console.log("Debugg ", Object.values(result));
    return Object.values(result);
  }

  // Filtering for the next 15 days
  function getNext15DaysOrderSummary(groupedData) {
    const today = new Date();
    const result = [];
    for (let i = 1; i <= 15; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
       //const dateStr = nextDate.toISOString().split("T")[0];
      const localDate = new Date(nextDate.getTime() - nextDate.getTimezoneOffset() * 60000);
      const dateStr = localDate.toISOString().split("T")[0];

      const match = groupedData.find((item) => item.deliveryDate === dateStr);
      result.push({
        deliveryDate: dateStr,
        Request: match ? match.Request : 0,
      });
    }
    console.log("Debug 2", result);
    return result;
  }

  const grouped = groupOrdersByDeliveryDate(apiData);
  const summary = getNext15DaysOrderSummary(grouped);

  useEffect(() => {
    getData();
  }, []);

  function convertDate(dateString) {
    const options = { day: "2-digit", month: "long" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-GB", options);
    return formattedDate.split(" "); // ['14', 'April']
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-6 bg-gray-200 w-full min-h-screen">
          <h1 className="font-bold text-3xl text-black">Order Request</h1>
          <br />

          <div className="flex flex-col items-center bg-gray-200 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-10 m-2">
              {summary.map((data, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/admin-order-request-detail",{ state:  data.deliveryDate})}
                  className="flex flex-col justify-center items-center w-40 h-24 bg-sky-500 text-white rounded-xl shadow-md hover:bg-sky-700 cursor-pointer transition duration-300"
                >
                  <p className="text-lg font-semibold">{convertDate(data.deliveryDate)[0]}</p>
                  <p className="text-base">{convertDate(data.deliveryDate)[1]}</p>
                  <p className="text-xl font-bold">{data.Request}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prakhar;
