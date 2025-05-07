import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

const Graph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startDate = formatDate(firstDayOfMonth);
    const endDate = formatDate(today);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    axios
    //   .get(`http://localhost:8080/api/admin/sales/salesReports/range?startDate=${startDate}&endDate=${endDate}`)
    .get(`http://localhost:8080/api/admin/sales/salesReports/range?startDate=2025-04-01&endDate=2025-04-30`)
      .then((response) => {
        console.log("Graph data:", response.data);
        const formatted = response.data
          .map(item => ({
            ...item,
            date: item.date.split('T')[0],
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setData(formatted);
        setError(null);
      })
      .catch((err) => {
        console.error("Graph fetch error:", err);
        setError('Failed to load graph data.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 font-medium">
        Loading graph...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center h-64 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-gray-500 font-medium text-center h-64 flex items-center justify-center">
        No sales data for this month.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" name="Revenue" />
        <Line type="monotone" dataKey="total_quantity" stroke="#82ca9d" name="Quantity" />
        <Line type="monotone" dataKey="total_orders" stroke="#ff7300" name="Orders" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
