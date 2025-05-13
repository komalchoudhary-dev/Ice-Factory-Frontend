import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Graph from '../components/graph';
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
  const [loading, setLoading] = useState(true); // <-- Loading state

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  const formattedDate = localToday.toISOString().split('T')[0];

  function getData() {
    setLoading(true); // Start loading
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`)
      .then((response) => {
        console.log("Today's delivery", response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  }

  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
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
          {/* Conditional loading UI */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-blue-500 animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <p className="text-gray-600 font-medium">Loading data...</p>
            </div>
          ) : (
            <>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {apiData.filter(order => order.status === "confirmed").length}
                    </p>
                  </div>
                  <img src={DeliveryTruck} alt="Delivery Truck" className="h-12 w-auto" />
                </div>

                {/* Delivered */}
                <div className="flex items-center justify-between bg-green-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Delivered</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {apiData.filter(order => order.status === "delivered").length}
                    </p>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        apiData
                        .filter(order => order.status === "delivered")
                        .reduce((total, order) => total + (order.quantity || 0), 0)
                      }
                    </p>
                  </div>
                  <img src={Sold} alt="Sold Icon" className="h-12 w-auto" />
                </div>

                {/* Revenue */}
                <div className="flex items-center justify-between bg-purple-100 border border-gray-300 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Revenue (₹)</p>
                    <p className="text-2xl font-bold text-gray-900">Rs. 
                      {
    apiData
      .filter(order => order.status === "delivered")
      .reduce((total, order) => total + (order.quantity || 0) * (order.rate || 0), 0)
  }
                    </p>
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

              {/* Graph Placeholder */}
              <p className="font-bold text-xl mb-3">Monthly Sales</p>
              <div className=" bg-gray border border-gray-300 rounded-lg shadow flex items-center justify-center">
                
                 <Graph />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
