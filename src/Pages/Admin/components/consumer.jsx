import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Consumer()
{
    const[apiData,setApiData]=useState([]);
    const navigate = useNavigate();
    function getData(){
        const data = axios.get(`http://localhost:8080/api/public/users`)
        .then((response) => {
          console.log("Data aa gaya Oooee ",response.data)
          setApiData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
      }
    useEffect(() => {
        getData();
      }, []);
      const handleClick = () => {
        navigate("/admin-customer-detail");
      };

      return(
        <div className="flex flex-col w-full p-2">
          <div className='bg-white-200 w-full'>
            <p className='text-2xl font-bold px-4'>Consumer Data</p>
          </div>
          <div className="p-4">
      <h2 className="text-2xl  mb-4">User Table</h2>
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Rate</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{idx+1}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2 ">{user.phone}</td>
              <td className="border px-4 py-2">{user.rate ?? '-'}</td>
              <td className="border px-4 py-2 flex flex-col items-center justify-center">
  <button className="bg-blue-400 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded border border-black">
    Edit Rate
  </button>
  <button
    className="bg-gray-200 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded border border-black mt-2"
    onClick={() => navigate("/admin-Customer-detail", {
        state: { 
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName
        }
      })}
      
  >
    View Detail
  </button>
</td>

             </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
      )
}


export default Consumer;