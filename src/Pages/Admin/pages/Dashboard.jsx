import Sidebar from '../components/Sidebar'; // ✅ fix path
import Navbar from '../components/Navbar'; // ✅ fix path
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

function Dashboard() {
  const [apiData, setApiData] = useState([]);
  const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
    console.log("Formatted Date: ", formattedDate);
  // getting the data from the api
  function getData(){
    const data = axios.get(`http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`)
    .then((response) => {
      console.log("Todays delivery ",response.data)
      setApiData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
  }


const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
const ModifiedDate = today.toLocaleDateString('en-GB', options);
 
  useEffect(() => {
    getData();
  }
  , []);

  return (
    <div className="flex flex-col">
      <div><Navbar/></div>
      <div className='flex'>
         <Sidebar />
         <div className='flex flex-col w-full p-2'>
      <div className='flex flex-col h-24'>
      <p className='text-2xl font-bold bg-sky-300 h-16 border border-black rounded-md flex items-center justify-start px-4'>
  {ModifiedDate}
</p>

        </div>
      <div className='bg-red-200 w-full min-h-screen p-4'>
        <div>
          <p>{apiData.length}</p>
        </div>
        <div className='flex flex-col'>
          <p>{} Order to be Delivered</p>
          <p>{} Order Delivered</p>
          <p>{} New Request</p>
        </div>
        <div>
          <p className='font-bold text-xl'>Monthly Sales</p>
          <div>Graph</div>
        </div>
        <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
