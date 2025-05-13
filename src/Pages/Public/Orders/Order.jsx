// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../../UserContext.jsx';
// import './Order.css';
// import Navbar from '../Components/Navbar/Navbar.jsx';
// import Footer from '../Components/Footer/Footer.jsx';

// const Order = () => {
//   const navigate = useNavigate();
//   const { userPhone } = useContext(UserContext);
//   const [dateCards, setDateCards] = useState([]);
//   const [availabilityData, setAvailabilityData] = useState({});
//   const [orderForecast, setOrderForecast] = useState({});
//   const [capacityForecast, setCapacityForecast] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Generate dates for the next 15 days
//   useEffect(() => {
//     const generateDateCards = () => {
//       const dates = [];
//       const today = new Date();
      
//       for (let i = 0; i < 15; i++) {
//         const date = new Date(today);
//         date.setDate(today.getDate() + i);
        
//         dates.push({
//           dateObj: date,
//           dateString: date.toISOString().split('T')[0], // YYYY-MM-DD format
//           dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
//           dayNumber: date.getDate(),
//           month: date.toLocaleDateString('en-US', { month: 'short' })
//         });
//       }
      
//       setDateCards(dates);
//     };
    
//     generateDateCards();
//   }, []);

//   // Fetch both capacity and order forecast data
//   useEffect(() => {
//     const fetchForecasts = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch capacity forecast for the next 15 days
//         const capacityResponse = await fetch('http://localhost:8080/api/public/capacity/forecast');
        
//         if (!capacityResponse.ok) {
//           throw new Error(`HTTP error fetching capacity! Status: ${capacityResponse.status}`);
//         }
        
//         const capacityData = await capacityResponse.json();
//         console.log("Capacity API Response:", capacityData);
//         setCapacityForecast(capacityData);
        
//         // Fetch order forecast for the next 15 days
//         const orderResponse = await fetch('http://localhost:8080/api/public/orders/forecast/next-15-days');
        
//         if (!orderResponse.ok) {
//           throw new Error(`HTTP error fetching orders! Status: ${orderResponse.status}`);
//         }
        
//         const forecastData = await orderResponse.json();
//         console.log("Order API Response:", forecastData);
//         setOrderForecast(forecastData);
        
//         // Generate availability data based on capacity and order forecasts
//         const availabilityData = {};
        
//         // Check if both data objects are valid
//         if (capacityData && forecastData && typeof capacityData === 'object' && typeof forecastData === 'object') {
//           // Go through all dates in the capacity forecast
//           Object.keys(capacityData).forEach(dateString => {
//             // Get capacity for this date (use default 0 if not found)
//             const dailyCapacity = parseInt(capacityData[dateString]) || 0;
            
//             // Get orders for this date (use default 0 if not found)
//             const orderedBlocks = parseInt(forecastData[dateString]) || 0;
            
//             console.log(`Date: ${dateString}, Capacity: ${dailyCapacity}, Ordered: ${orderedBlocks}`);
            
//             // Calculate available blocks based on capacity and existing orders
//             const availableBlocks = Math.max(0, dailyCapacity - orderedBlocks);
            
//             availabilityData[dateString] = {
//               dailyCapacity,
//               availableBlocks,
//               totalOrdersForDate: orderedBlocks
//             };
//           });
          
//           console.log("Availability data:", availabilityData);
//         } else {
//           console.error("Data is not in expected format:", { capacityData, forecastData });
//           throw new Error("Invalid data format received from server");
//         }
        
//         setAvailabilityData(availabilityData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching forecast data:", err);
        
//         // Fallback to mock data in case of an error
//         console.log("Falling back to mock data");
        
//         // Generate mock forecast data for the next 15 days
//         const mockOrderData = {};
//         const mockCapacityData = {};
//         const mockAvailabilityData = {};
//         const today = new Date();
        
//         for (let i = 0; i < 15; i++) {
//           const date = new Date(today);
//           date.setDate(today.getDate() + i);
//           const dateString = date.toISOString().split('T')[0];
          
//           // Random capacity between 800 and 1500
//           const dailyCapacity = Math.floor(Math.random() * 700) + 800;
//           mockCapacityData[dateString] = dailyCapacity;
          
//           // Random number of orders between 0 and 600
//           const orderedBlocks = Math.floor(Math.random() * 600);
//           mockOrderData[dateString] = orderedBlocks;
          
//           // Calculate available blocks
//           mockAvailabilityData[dateString] = {
//             dailyCapacity,
//             availableBlocks: Math.max(0, dailyCapacity - orderedBlocks),
//             totalOrdersForDate: orderedBlocks
//           };
//         }
        
//         setOrderForecast(mockOrderData);
//         setCapacityForecast(mockCapacityData);
//         setAvailabilityData(mockAvailabilityData);
//         setLoading(false);
//         setError("Using mock data: Couldn't connect to the server. Please try again later.");
//       }
//     };
    
//     fetchForecasts();
//   }, []);

//   // Handle date selection with authentication check
//   const handleDateSelect = (dateString) => {
//     // Check if user is logged in
//     if (!userPhone) {
//       // User is not logged in, redirect to registration page
//       navigate('/login', { 
//         state: { 
//           redirectAfterRegister: '/order-details',
//           selectedDate: dateString,
//           availability: availabilityData[dateString]?.availableBlocks || 0,
//           orderCount: availabilityData[dateString]?.totalOrdersForDate || 0,
//           dailyCapacity: availabilityData[dateString]?.dailyCapacity || 0
//         } 
//       });
//     } else {
//       // User is logged in, proceed to order details
//       navigate('/order-details', { 
//         state: { 
//           selectedDate: dateString,
//           availability: availabilityData[dateString]?.availableBlocks || 0,
//           orderCount: availabilityData[dateString]?.totalOrdersForDate || 0,
//           dailyCapacity: availabilityData[dateString]?.dailyCapacity || 0
//         } 
//       });
//     }
//   };

//   // Calculate availability percentage based on dynamic capacity
//   const getAvailabilityStatus = (dateString) => {
//     if (!availabilityData[dateString]) {
//       return { status: 'unknown', percentage: 0 };
//     }
    
//     // Get the daily capacity for this date
//     const dailyCapacity = availabilityData[dateString].dailyCapacity;
//     if (!dailyCapacity || dailyCapacity <= 0) {
//       return { status: 'low', percentage: 0 };
//     }
    
//     // Calculate availability based on available blocks vs daily capacity
//     const availableBlocks = availabilityData[dateString].availableBlocks;
//     const availabilityPercentage = Math.min(100, (availableBlocks / dailyCapacity) * 100);
    
//     let status = 'high';
//     if (availabilityPercentage < 30) status = 'low';
//     else if (availabilityPercentage < 70) status = 'medium';
    
//     return { status, percentage: availabilityPercentage };
//   };

//   if (loading) return (
//     <>
//       <Navbar />
//       <div className="order-container">
//         <div className="loading">Loading availability data...</div>
//       </div>
//     </>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="order-container">
//         <div className="order-page-header">
//           <h1 className='order-heading'>Select Delivery Date</h1>
//         </div>
        
//         {error && <div className="error-message">{error}</div>}
        
//         <div className="date-cards-container">
//           {dateCards.map((dateInfo) => {
//             const availability = getAvailabilityStatus(dateInfo.dateString);
//             const availData = availabilityData[dateInfo.dateString] || { dailyCapacity: 0, availableBlocks: 0, totalOrdersForDate: 0 };
//             const { dailyCapacity, availableBlocks, totalOrdersForDate } = availData;
            
//             return (
//               <div 
//                 key={dateInfo.dateString} 
//                 className={`date-card availability-${availability.status}`}
//                 onClick={() => handleDateSelect(dateInfo.dateString)}
//               >
//                 <div className="date-card-inner">
//                   <div className="date-info">
//                     <div className="date-circle">
//                       <div className="day-name">{dateInfo.dayName}</div>
//                       <div className="day-number">{dateInfo.dayNumber}</div>
//                     </div>
//                     <div className="month-year">
//                       <span className="month">{dateInfo.month}</span>
//                       <span className="year">{dateInfo.dateObj.getFullYear()}</span>
//                     </div>
//                   </div>
                  
//                   {/* <div className="availability-indicator">
//                     <div className="availability-label">
//                       Availability: 
//                       <span className={`status-${availability.status}`}>
//                         {availability.status === 'high' ? 'High' : 
//                          availability.status === 'medium' ? 'Medium' : 'Low'}
//                       </span>
//                     </div>
//                     <div className="availability-bar">
//                       <div 
//                         className={`availability-fill status-${availability.status}`} 
//                         style={{ width: `${availability.percentage}%` }}
//                       ></div>
//                     </div>
//                   </div> */}
                  
//                   <div className="order-info">
                  
//                     <p>Orders placed:  <strong>{totalOrdersForDate}</strong> blocks</p>
//                     <p>Available:  <strong>{availableBlocks}</strong> blocks</p> 
//                     <p>Capacity:  <strong>{dailyCapacity}</strong> blocks</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
        
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Order;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext.jsx';
import './Order.css';
import Navbar from '../Components/Navbar/Navbar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

const Order = () => {
  const navigate = useNavigate();
  const { userPhone } = useContext(UserContext);
  const [dateCards, setDateCards] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});
  const [orderForecast, setOrderForecast] = useState({});
  const [capacityForecast, setCapacityForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate dates for the next 15 days
  useEffect(() => {
    const generateDateCards = () => {
      const dates = [];
      const today = new Date();
      
      for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        dates.push({
          dateObj: date,
          dateString: date.toLocaleDateString('en-CA'), // ✅ FIXED
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' })
        });
      }

      setDateCards(dates);
    };

    generateDateCards();
  }, []);

  // Fetch both capacity and order forecast data
  useEffect(() => {
    const fetchForecasts = async () => {
      try {
        setLoading(true);

        const capacityResponse = await fetch('http://localhost:8080/api/public/capacity/forecast');
        if (!capacityResponse.ok) {
          throw new Error(`HTTP error fetching capacity! Status: ${capacityResponse.status}`);
        }
        const capacityData = await capacityResponse.json();
        console.log("Capacity API Response:", capacityData);
        setCapacityForecast(capacityData);

        const orderResponse = await fetch('http://localhost:8080/api/public/orders/forecast/next-15-days');
        if (!orderResponse.ok) {
          throw new Error(`HTTP error fetching orders! Status: ${orderResponse.status}`);
        }
        const forecastData = await orderResponse.json();
        console.log("Order API Response:", forecastData);
        setOrderForecast(forecastData);

        const availabilityData = {};
        if (capacityData && forecastData && typeof capacityData === 'object' && typeof forecastData === 'object') {
          Object.keys(capacityData).forEach(dateString => {
            const dailyCapacity = parseInt(capacityData[dateString]) || 0;
            const orderedBlocks = parseInt(forecastData[dateString]) || 0;
            console.log(`Date: ${dateString}, Capacity: ${dailyCapacity}, Ordered: ${orderedBlocks}`);
            const availableBlocks = Math.max(0, dailyCapacity - orderedBlocks);
            availabilityData[dateString] = {
              dailyCapacity,
              availableBlocks,
              totalOrdersForDate: orderedBlocks
            };
          });
          console.log("Availability data:", availabilityData);
        } else {
          console.error("Data is not in expected format:", { capacityData, forecastData });
          throw new Error("Invalid data format received from server");
        }

        setAvailabilityData(availabilityData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching forecast data:", err);
        console.log("Falling back to mock data");

        const mockOrderData = {};
        const mockCapacityData = {};
        const mockAvailabilityData = {};
        const today = new Date();

        for (let i = 0; i < 15; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateString = date.toLocaleDateString('en-CA'); // ✅ FIXED

          const dailyCapacity = Math.floor(Math.random() * 700) + 800;
          mockCapacityData[dateString] = dailyCapacity;

          const orderedBlocks = Math.floor(Math.random() * 600);
          mockOrderData[dateString] = orderedBlocks;

          mockAvailabilityData[dateString] = {
            dailyCapacity,
            availableBlocks: Math.max(0, dailyCapacity - orderedBlocks),
            totalOrdersForDate: orderedBlocks
          };
        }

        setOrderForecast(mockOrderData);
        setCapacityForecast(mockCapacityData);
        setAvailabilityData(mockAvailabilityData);
        setLoading(false);
        setError("Using mock data: Couldn't connect to the server. Please try again later.");
      }
    };

    fetchForecasts();
  }, []);

  const handleDateSelect = (dateString) => {
    if (!userPhone) {
      navigate('/login', { 
        state: { 
          redirectAfterRegister: '/order-details',
          selectedDate: dateString,
          availability: availabilityData[dateString]?.availableBlocks || 0,
          orderCount: availabilityData[dateString]?.totalOrdersForDate || 0,
          dailyCapacity: availabilityData[dateString]?.dailyCapacity || 0
        } 
      });
    } else {
      navigate('/order-details', { 
        state: { 
          selectedDate: dateString,
          availability: availabilityData[dateString]?.availableBlocks || 0,
          orderCount: availabilityData[dateString]?.totalOrdersForDate || 0,
          dailyCapacity: availabilityData[dateString]?.dailyCapacity || 0
        } 
      });
    }
  };

  const getAvailabilityStatus = (dateString) => {
    if (!availabilityData[dateString]) {
      return { status: 'unknown', percentage: 0 };
    }

    const dailyCapacity = availabilityData[dateString].dailyCapacity;
    if (!dailyCapacity || dailyCapacity <= 0) {
      return { status: 'low', percentage: 0 };
    }

    const availableBlocks = availabilityData[dateString].availableBlocks;
    const availabilityPercentage = Math.min(100, (availableBlocks / dailyCapacity) * 100);

    let status = 'high';
    if (availabilityPercentage < 30) status = 'low';
    else if (availabilityPercentage < 70) status = 'medium';

    return { status, percentage: availabilityPercentage };
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="order-container">
        <div className="loading">Loading availability data...</div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="order-container">
        <div className="order-page-header">
          <h1 className='order-heading'>Select Delivery Date</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="date-cards-container">
          {dateCards.map((dateInfo) => {
            const availability = getAvailabilityStatus(dateInfo.dateString);
            const availData = availabilityData[dateInfo.dateString] || { dailyCapacity: 0, availableBlocks: 0, totalOrdersForDate: 0 };
            const { dailyCapacity, availableBlocks, totalOrdersForDate } = availData;

            return (
              <div 
                key={dateInfo.dateString} 
                className={`date-card availability-${availability.status}`}
                onClick={() => handleDateSelect(dateInfo.dateString)}
              >
                <div className="date-card-inner">
                  <div className="date-info">
                    <div className="date-circle">
                      <div className="day-name">{dateInfo.dayName}</div>
                      <div className="day-number">{dateInfo.dayNumber}</div>
                    </div>
                    <div className="month-year">
                      <span className="month">{dateInfo.month}</span>
                      <span className="year">{dateInfo.dateObj.getFullYear()}</span>
                    </div>
                  </div>

                  <div className="order-info">
                    <p>Orders placed:  <strong>{totalOrdersForDate}</strong> blocks</p>
                    <p>Available:  <strong>{availableBlocks}</strong> blocks</p> 
                    <p>Capacity:  <strong>{dailyCapacity}</strong> blocks</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
