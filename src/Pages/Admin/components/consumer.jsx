// import React,{useState, useEffect} from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// function Consumer()
// {
//     const[apiData,setApiData]=useState([]);
//     const navigate = useNavigate();
//     function getData(){
//         const data = axios.get(`http://localhost:8080/api/public/users`)
//         .then((response) => {
//           console.log("Data aa gaya Oooee ",response.data)
//           setApiData(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching data", error);
//         });
//       }
//     useEffect(() => {
//         getData();
//       }, []);
//       const handleClick = () => {
//         navigate("/admin-customer-detail");
//       };

//       return(
//         <div className="flex flex-col w-full p-2">
//           <div className='bg-white-200 w-full'>
//             <p className='text-2xl font-bold px-4'>Consumer Data</p>
//           </div>
//           <div className="p-4">
//       <h2 className="text-2xl  mb-4">User Table</h2>
//       <table className="min-w-full table-auto border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">#</th>
//             <th className="border px-4 py-2">First Name</th>
//             <th className="border px-4 py-2">Last Name</th>
//             <th className="border px-4 py-2">Phone</th>
//             <th className="border px-4 py-2">Rate</th>
//             <th className="border px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {apiData.map((user, idx) => (
//             <tr key={idx} className="hover:bg-gray-50">
//               <td className="border px-4 py-2">{idx+1}</td>
//               <td className="border px-4 py-2">{user.firstName}</td>
//               <td className="border px-4 py-2">{user.lastName}</td>
//               <td className="border px-4 py-2 ">{user.phone}</td>
//               <td className="border px-4 py-2">{user.rate ?? '-'}</td>
//               <td className="border px-4 py-2 flex flex-col items-center justify-center">
//                 <div className=",flex flex-col items-center justify-center">
//   <button className="bg-blue-400 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded border border-black">
//     Edit Rate
//   </button>
  
//   <button
//     className="bg-gray-200 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded border border-black mt-2"
//     onClick={() => navigate("/admin-Customer-detail", {
//         state: { 
//           phone: user.phone,
//           firstName: user.firstName,
//           lastName: user.lastName
//         }
//       })}
      
//   >
//     View Detail
//   </button>
// </div>
// </td>

//              </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//           </div>
//       )
// }


// export default Consumer;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Consumer() {
  const [apiData, setApiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRate, setNewRate] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get(`http://localhost:8080/api/public/users`)
      .then((response) => {
        console.log("Consumer Data aa gaya oo ", response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

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
  //http://localhost:8080/api/public/users/update/${userData.contact}
  const handleRateUpdate = () => {
    if (!selectedUser || newRate === "") return;

    // axios.put(`http://localhost:8080/api/public/users/update/${selectedUser.phone}`, {
    //   rate: parseFloat(newRate)
    // })
    //   .then(() => {
    //     getData();
    //     setMessage({ type: "success", text: "Rate updated successfully!" });
    //     closeModal();
    //   })
    //   .catch((error) => {
    //     setMessage({ type: "error", text: "Failed to update rate." });
    //     console.error("Error updating rate:", error);
    //   });
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

  return (
    <div className="flex flex-col w-full p-2 relative">
      <div className='bg-white-200 w-full'>
        <p className='text-2xl font-bold px-4'>Consumer Data</p>
      </div>

      {message.text && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded text-white shadow-md z-50
          ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}

      <div className="p-4">
        <h2 className="text-2xl mb-4">User Table</h2>
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
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.rate ?? '-'}</td>
                <td className="border px-4 py-2 flex flex-col items-center justify-center">
                  <button
                    className="bg-blue-400 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded border border-black mb-2"
                    onClick={() => openModal(user)}
                  >
                    Edit Rate
                  </button>

                  <button
                    className="bg-gray-200 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded border border-black"
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

      {/* Modal Dialog */}
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

export default Consumer;

