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
  <p>{`Order Details for ${data.firstName} ${data.lastName}`}</p>

       <br/>
            {apiData.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border">
      <thead>
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
