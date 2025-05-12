import Sidebar from '../components/Sidebar'; // ✅ fix path
import Navbar from '../components/Navbar'; // ✅ fix path
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Detail() {
     
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    console.log("Data from Customer page: ", data);
    // if (!data || data.from !== "/admin-customer") {
    //   // Redirect if not accessed via the proper route
    //  navigate("/admin-customer")
    // }
    const [apiData, setApiData] = useState([]);
   
  // Fetch data from API
  function getData() {
    axios
      //.get(`http://localhost:8080/api/public/users/details/${data.phone}`)  //Api Not giving Address
      .get(`http://localhost:8080/api/public/orders/phone/${data.phone}`)
      .then((response) => {
        setApiData(response.data);
        console.log("Hello check",data.phone, response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }
  console.log("Data from API: ", apiData);
  useEffect(() => {
      getData();
    }, []);

    const handleClick = () => {
        console.log("Accepted!");
      };
      
      const handleReject = () => {
        console.log("Rejected!");
      };
      return(<div className="flex flex-col">
        <Navbar/>
        <div className ='flex'>
            <Sidebar/>
  <div className="flex flex-col w-full p-2">
    <h1 className="text-2xl font-bold">
  Order Details 
</h1>
  <h2 className="text-xl font-gray font-semibold flex justify-between">
  <span>{`Customer Name: ${data.firstName} ${data.lastName}`}</span>
  <span>{`Phone number: ${data.phone}`}</span>
</h2>



       <br/>
            {apiData.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border">
      {/* <thead>
        <tr>
          <th className="border px-4 py-2 bg-gray-100">S.No</th>
          {Object.keys(apiData[0]).map((key) => (
            <th key={key} className="border px-4 py-2 bg-gray-100 text-left">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {apiData.map((row, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{index + 1}</td>
            {Object.values(row).map((value, i) => (
              <td key={i} className="border px-4 py-2">{value}</td>
            ))}
          </tr>
        ))}
      </tbody> */}
      <thead>
  <tr>
    <th className="border px-4 py-2 bg-gray-100">S.No</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">ID</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Phone</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Email</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Order Date</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Delivery Date</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Quantity</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Rate</th>
    <th className="border px-4 py-2 bg-gray-100 text-left">Total Amount</th>
  </tr>
</thead>
<tbody>
  {apiData
    .slice() // copy array so original doesn't mutate
    .sort((a, b) => {
      const dateA = a.deliveryDate ? new Date(a.deliveryDate) : new Date(0);
      const dateB = b.deliveryDate ? new Date(b.deliveryDate) : new Date(0);
      return dateB - dateA; // descending order
    })
    .map((row, index) => {
      const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      return (
        <tr key={index}>
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2">{row.id}</td>
          <td className="border px-4 py-2">{row.phone}</td>
          <td className="border px-4 py-2">{row.email || ''}</td>
          <td className="border px-4 py-2">{formatDate(row.orderDate)}</td>
          <td className="border px-4 py-2">{formatDate(row.deliveryDate)}</td>
          <td className="border px-4 py-2">{row.quantity}</td>
          <td className="border px-4 py-2">
            {row.quantity ? (row.totalAmount / row.quantity).toFixed(2) : ''}
          </td>
          <td className="border px-4 py-2">{row.totalAmount}</td>
        </tr>
      );
    })}
</tbody>


    </table>
  </div>
) : (
  <p className="mt-4 text-gray-600">No data to display.</p>
)}
     </div>
        
        </div>
    </div>)
}

export default Detail;
