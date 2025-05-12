import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

const Graph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the authentication token from localStorage
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      console.error("Authentication token not found");
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    // Calculate date range (current month)
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startDate = formatDate(firstDayOfMonth);
    const endDate = formatDate(today);

    console.log("Fetching sales data from:", startDate, "to:", endDate);

    // Make API call with proper authentication header
    axios.get('http://localhost:8080/api/admin/sales/salesReports/range', {
  headers: {
    'Authorization': `Bearer ${authToken}`  // No extra spaces or formatting issues
  },
  params: {
    startDate: startDate,  // Make sure these are in yyyy-MM-dd format
    endDate: endDate
  }
})
    .then((response) => {
      console.log("Graph data received:", response.data);
      
      // Process and format the data
      const formatted = response.data
        .map(item => {
          const rawDate = new Date(item.date);
          const day = String(rawDate.getDate()).padStart(2, '0');
          const month = rawDate.toLocaleString('default', { month: 'short' });
          return {
            ...item,
            rawDate: rawDate, // For sorting
            labelDate: `${day}-${month}` // For display on X axis
          };
        })
        .sort((a, b) => a.rawDate - b.rawDate);

      setData(formatted);
      setError(null);
    })
    .catch((err) => {
      console.error("Graph fetch error:", err);
      
      // Provide more specific error messages based on the error response
      if (err.response) {
        if (err.response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (err.response.status === 403) {
          setError('You do not have permission to access this data.');
        } else {
          setError(`Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        setError('No response from server. Check your connection.');
      } else {
        setError('Failed to load graph data: ' + err.message);
      }
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 font-medium">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        Loading graph data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center h-64 flex flex-col items-center justify-center">
        <div className="mb-2">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-gray-500 font-medium text-center h-64 flex items-center justify-center">
        No sales data available for this month.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="labelDate" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip 
          formatter={(value, name) => {
            if (name === "Revenue") return [`₹${value}`, name];
            return [value, name];
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="total_revenue" fill="#8884d8" name="Revenue" />
        <Bar yAxisId="right" dataKey="total_quantity" fill="#82ca9d" name="Quantity" />
        <Bar yAxisId="right" dataKey="total_orders" fill="#ff7300" name="Orders" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
