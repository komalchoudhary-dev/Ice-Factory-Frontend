// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// function Prakhar() {
//   const x = 5;
//   const [apiData, setApiData] = useState([]);

//   // Get today's date in YYYY-MM-DD format
//   const today = new Date();
//   //const futureDate = new Date();
// today.setDate(today.getDate());
// const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000); // Adjust for timezone
// const formattedDate = localDate.toISOString().split("T")[0];
// console.log("Formatted date:", formattedDate);

//   // const today = new Date();
//   // const formattedDate = today.toISOString().split("T")[0];
//   console.log("Formatted date: ", formattedDate);
//   console.log("Today AAJJJ : ", today);
  
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
//   const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
//   const ModifiedDate = today.toLocaleDateString('en-GB', options);
//   console.log("Forna ", ModifiedDate);
//   useEffect(() => {
//     getData();
//   }, []);

//   // Filter today's pending orders
//   // const todayPendingOrders = apiData.filter((item) => {
//   //   const deliveryDate = new Date(item.deliveryDate).toISOString().split("T")[0];
//   //   return item.status === "pending" && deliveryDate === formattedDate;
//   // });

//   return (
//     <div className="flex flex-col">
//       <Navbar />
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar val={x} />
       
//       <div className="flex-1 p-6 ">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 border border-black rounded-lg bg-gray-100 px-6 py-3 shadow-md">
//   Orders to be Delivered : {ModifiedDate}
// </h1>

//         {apiData.length === 0 ? (
//           <p className="text-gray-600">No deliveries for today.</p>
//         ) : (
//           <div className="overflow-x-auto rounded shadow">
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
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Prakhar;
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Detail() {
  const data = new Date();

  const formattedDateReadable = data.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const getFormattedDateForAPI = () => {
    const yyyy = data.getFullYear();
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const dd = String(data.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [selectedRows, setSelectedRows] = useState([]);


  function getData() {
    setLoading(true); 
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${getFormattedDateForAPI()}`)
      .then((response) => {
        setApiData(response.data);
        console.log("Aaj ka delivery", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false); // ✅ This will now run properly
      });
  }
  

  useEffect(() => {
    getData();
  }, []);

 
  const cnt =1;
  const ptr=1;
  
  const handleClick = async (orderId) => {
      const confirmed = window.confirm("Are you sure you want to confirm  this delivery?");
      if (!confirmed) return;
  
      try {
        await axios.put(`http://localhost:8080/api/public/orders/status/${orderId}/delivered`);
        getData();
      } catch (error) {
        console.error("Error accepting order:", error);
      }
    };
 
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
      <div className='flex'>
        <Sidebar />
        <div className="flex flex-col w-full p-2">
          <div className='bg-white-200 w-full'>
            <p className='text-2xl font-bold px-4'>Delivery Date- {formattedDateReadable}</p>

            
          </div>

          <br />
          <div className='w-full'>
            <h1 className='font-bold'>Order Yet To Be Delivered</h1>
            <div className="overflow-x-auto rounded shadow">
              <table className="min-w-full bg-white border border-black">
                <thead className="bg-gray-200 text-black">
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
                          {apiData
                            .filter(item => item.status === "confirmed")
                            .map((item, index) => (
                              <tr key={item.orderId} className="text-center border-t">
                                <td className="py-2 px-4 border">{index + 1}</td> {/* Correct sequence */}
                                <td className="py-2 px-4 border">{item.orderId}</td>
                                <td className="py-2 px-4 border"><p>{item.firstName} {item.lastName}</p></td>
                                <td className="py-2 px-4 border">{item.quantity}</td>
                                <td className="py-2 px-4 border">{item.street} {item.city} {item.pincode}</td>
                                <td className="py-2 px-4 border">{item.phone}</td>
                                <td className="py-2 px-4 border capitalize">{item.status}</td>
                                <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border">{item.totalAmount}</td>
                                <td className="py-2 px-8 border">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                                    onClick={() => handleClick(item.orderId)}
                                  >
                                    Delivered
                                  </button>
                                </td>
                              </tr>
                            ))}
                  </tbody>

              </table>
            </div>
          </div>
          
          <br />
          <div className='w-full'>
            <h1 className="font-bold">Order Delivered</h1>
            <div className="overflow-x-auto rounded shadow">
              <table className="min-w-full bg-white border border-black">
                <thead className="bg-gray-200 text-black">
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
                     .filter(item => item.status === "delivered")
                     .map((item, index) => (
                       <tr key={item.orderId} className="text-center border-t">
                         <td className="py-2 px-4 border">{index + 1}</td> {/* Sequence number */}
                         <td className="py-2 px-4 border">{item.orderId}</td>
                         <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
                         <td className="py-2 px-4 border">{item.quantity}</td>
                         <td className="py-2 px-4 border"><p>{item.street}  ,{item.city}  {item.pincode}</p></td>
                         <td className="py-2 px-4 border">{item.phone}</td>
                         <td className="py-2 px-4 border capitalize">{item.status}</td>
                         <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                         <td className="py-2 px-4 border">{item.totalAmount}</td>
                       </tr>
                     ))}
                </tbody>

              </table>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
}

export default Detail;
