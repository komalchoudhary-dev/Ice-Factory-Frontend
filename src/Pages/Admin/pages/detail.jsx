import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import React, { useState, useEffect, useRef } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRate, setNewRate] = useState("");
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState({ type: "", text: "" });
  const modalRef = useRef();

  // Fetch API data
  function getData() {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${data.deliveryDate}`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  }
  console.log("Fetched delivery data: ", apiData);
  useEffect(() => {
    getData();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRate(user.rate || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewRate("");
  };

  const handleRateUpdate = () => {
    if (!selectedUser || newRate === "") return;

    axios.put(`http://localhost:8080/api/public/users/${selectedUser.phone}/rate?newRate=${parseFloat(newRate)}`)
  .then(() => {
    getData();
    setMessage({ type: "success", text: "Rate updated successfully!" });
    closeModal();
  })
  .catch((error) => {
    setMessage({ type: "error", text: "Failed to update rate." });
    console.error("Error updating rate:", error);
  });


    // Remove message after 3 seconds
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

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
    return 1200 - amt;
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
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full gap-4">
          <div className='bg-white-200 w-full gap-6 flex flex-col'>
            <div ><p className='text-2xl font-bold px-4'>Delivery Date - {formattedDate}</p></div>
            
            {message.text && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded text-white shadow-md z-50
          ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}
            <div className="grid grid-cols-4 gap-8 px-6">
              <div className="w-64 h-16 bg-sky-200 border border-black rounded-md text-black text-center">
                <p className="font-bold text-sm">Accepted</p>
                {apiData.filter(item => item.status === "confirmed").length}
              </div>
              <div className="w-64 h-16 bg-sky-200 border border-black rounded-md text-black text-center">
                <p className="font-bold text-sm">Rejected</p>
                {apiData.filter(item => item.status === "rejected").length}
              </div>
              <div className="w-64 h-16 bg-sky-200 border border-black rounded-md text-black text-center">
                <p className="font-bold text-sm">Pending</p>
                {apiData.filter(item => item.status === "pending").length}
              </div>
              <div className="w-64 h-16 bg-sky-200 border border-black rounded-md text-black text-center">
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
                  <th className="py-2 px-4 border">Rate</th>
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
        <td className="py-2 px-4 border">{item.totalAmount/item.quantity}</td>
        <td className="py-2 px-4 border">{item.totalAmount}</td>
      </tr>
  ))}
              </tbody>
            </table>
          </div>
          {/* Accepted Rejected Table */}
          {/* <h1 className=" px-6 text-2xl font-bold mt-6">Order Rejected</h1>
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
                  <th className="py-2 px-4 border">Rate</th>
                </tr>
              </thead>
              <tbody>
  {apiData
    .filter(item => item.status === "rejected")
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
        <td className="py-2 px-4 border">{item.rate}</td>
      </tr>
  ))}
</tbody>

            </table>
          </div> */}
          {apiData.filter(item => item.status === "rejected").length > 0 && (
  <>
    <h1 className="px-6 text-2xl font-bold mt-6">Order Rejected</h1>
    <div className="px-6 overflow-x-auto rounded shadow">
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
            <th className="py-2 px-4 border">Rate</th>
          </tr>
        </thead>
        <tbody>
          {apiData
            .filter(item => item.status === "rejected")
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
                <td className="py-2 px-4 border">{item.rate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </>
)}

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
                  <th className="py-2 px-4 border">Rate</th>
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
          <td className="py-2 px-4 border">{item.rate}</td>
          <td className="py-2 px-4 border">{item.rate*item.quantity}</td>
          <td className="py-2 px-4 border">
          <div className="flex items-center gap-x-4">
  <button
    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded"
    onClick={() => openModal(item)}
  ><p className="whitespace-nowrap">Edit Rate</p></button>
  

  <button
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
    onClick={() => handleClick(item.orderId)}
  >
    Accept
  </button>

  <button
    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
    onClick={() => handleReject(item.orderId)}
  >
    Reject
  </button>
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
      {isModalOpen && (
        <>
          {/* Dim background */}
          <div
            className="fixed inset-0  bg-opacity-80 z-40"
            onClick={closeModal}
          ></div>

          {/* Modal Box */}
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50" ref={modalRef}>

            <div className="bg-white w-[400px] max-w-full p-6 rounded-lg shadow-lg border">
              <h3 className="text-lg font-semibold mb-2 text-center">
                Edit Rate for {selectedUser?.firstName} {selectedUser?.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Current Rate: <strong>{selectedUser?.rate ?? "Not Set"}</strong>
              </p>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded mb-4"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="Enter new rate"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleRateUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;





