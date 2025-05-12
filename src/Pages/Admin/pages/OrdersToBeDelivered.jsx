import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Detail() {
  const today = new Date();

  const getFormattedDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] = useState(getFormattedDate(today));
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedDateReadable = new Date(selectedDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  function getData() {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${selectedDate}`)
      .then((response) => {
        setApiData(response.data);
        console.log("Delivery Data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [selectedDate]);

  const handleClick = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to confirm this delivery?");
    if (!confirmed) return;

    try {
      await axios.put(`http://localhost:8080/api/public/orders/status/${orderId}/delivered`);
      getData();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const confirmedOrders = apiData.filter(item => item.status === "confirmed");
  const deliveredOrders = apiData.filter(item => item.status === "delivered");
  const isToday = selectedDate === getFormattedDate(today);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);
  const maxDateStr = getFormattedDate(maxDate);

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
        <div className="flex flex-col w-full p-4">
          <div className='bg-white-200 w-full mb-4'>
            <p className='text-2xl font-bold'>Delivery Date - {formattedDateReadable}</p>
            <input
              type="date"
              className="mt-2 p-2 border rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getFormattedDate(today)}
              max={maxDateStr}
            />
          </div>

          <div className='w-full'>
            <h1 className='font-bold text-2xl mb-2'>Orders Yet To Be Delivered</h1>
            {confirmedOrders.length === 0 ? (
              <p className="text-gray-600 font-bold">No orders to be delivered on this date.</p>
            ) : (
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
                      <th className="py-2 px-4 border">Rate</th>
                      <th className="py-2 px-4 border">Amount</th>
                      {isToday && <th className="py-2 px-4 border">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedOrders.map((item, index) => (
                      <tr key={item.orderId} className="text-center border-t">
                        <td className="py-2 px-4 border">{index + 1}</td>
                        <td className="py-2 px-4 border">{item.orderId}</td>
                        <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
                        <td className="py-2 px-4 border">{item.quantity}</td>
                        <td className="py-2 px-4 border">{item.street} {item.city} {item.pincode}</td>
                        <td className="py-2 px-4 border">{item.phone}</td>
                        <td className="py-2 px-4 border capitalize">{item.status}</td>
                        <td className="py-2 px-4 border">{new Date(item.deliveryDate).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border">{item.totalAmount/item.quantity}</td>
                        <td className="py-2 px-4 border">{item.totalAmount}</td>
                        {isToday && (
                          <td className="py-2 px-4 border">
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                              onClick={() => handleClick(item.orderId)}
                            >
                              Delivered
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <br />

          {isToday && deliveredOrders.length > 0 && (
            <div className='w-full'>
              <h1 className="font-bold">Orders Delivered</h1>
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
                    {deliveredOrders.map((item, index) => (
                      <tr key={item.orderId} className="text-center border-t">
                        <td className="py-2 px-4 border">{index + 1}</td>
                        <td className="py-2 px-4 border">{item.orderId}</td>
                        <td className="py-2 px-4 border">{item.firstName} {item.lastName}</td>
                        <td className="py-2 px-4 border">{item.quantity}</td>
                        <td className="py-2 px-4 border">{item.street}, {item.city} {item.pincode}</td>
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
          )}

        </div>
      </div>
    </div>
  );
}

export default Detail;