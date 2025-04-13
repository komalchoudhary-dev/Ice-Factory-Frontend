import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Prakhar() {
  const x = 5;
  const [apiData, setApiData] = useState([]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  // Fetch data from API
  function getData() {
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`)
      .then((response) => {
        setApiData(response.data);
        console.log("Today's delivery data: ", response.data);
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

  // Filter today's pending orders
  // const todayPendingOrders = apiData.filter((item) => {
  //   const deliveryDate = new Date(item.deliveryDate).toISOString().split("T")[0];
  //   return item.status === "pending" && deliveryDate === formattedDate;
  // });

  return (
    <div className="flex flex-col">
      <Navbar />
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar val={x} />
       
      <div className="flex-1 p-6 bg-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border border-black rounded-lg bg-gray-100 px-6 py-3 shadow-md">
  Orders to be Delivered : {ModifiedDate}
</h1>

        {apiData.length === 0 ? (
          <p className="text-gray-600">No deliveries for today.</p>
        ) : (
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Prakhar;

