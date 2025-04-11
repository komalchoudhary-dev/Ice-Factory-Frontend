import React, { useState, useEffect } from "react";
import "./../css/Dashboard.css";

const orders = [
  { id: "O001", name: "Aman", qty: 10, rate: 30, status: "pending", date: "2025-04-10" },
  { id: "O002", name: "Reema", qty: 15, rate: 28, status: "confirmed", date: "2025-04-10" },
  { id: "O003", name: "Ravi", qty: 20, rate: 25, status: "delivered", date: "2025-04-10" },
  { id: "O004", name: "Karan", qty: 12, rate: 27, status: "delivered", date: "2025-04-09" },
  { id: "O005", name: "Pooja", qty: 8, rate: 30, status: "pending", date: "2025-04-09" }
];

const totalStock = 1200;

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const result = orders.filter(order => order.date === selectedDate);
    setFiltered(result);
  }, [selectedDate]);

  const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const pending = filtered.filter(o => o.status === "pending");
  const confirmed = filtered.filter(o => o.status === "confirmed");
  const delivered = filtered.filter(o => o.status === "delivered");

  const totalOrders = filtered.length;
  const quantitySold = filtered.reduce((sum, o) => sum + o.qty, 0);
  const remainingStock = totalStock - quantitySold;

  return (
    <div className="main">
      <div className="main-header">
        <h1>Dashboard</h1>
        <div className="date-box">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Centered selected date */}
      <div className="selected-date-box">{formatDateLabel(selectedDate)}</div>

      {/* First row: status cards */}
      <div className="dashboard-section">
        <div className="card pending">
          <h3>Pending</h3>
          <span>{pending.length}</span>
        </div>
        <div className="card confirmed">
          <h3>Confirmed</h3>
          <span>{confirmed.length}</span>
        </div>
        <div className="card delivered">
          <h3>Delivered</h3>
          <span>{delivered.length}</span>
        </div>
      </div>

      {/* Second row: summary stats */}
      <div className="dashboard-section">
        <div className="card">
          <h3>Total Orders</h3>
          <span>{totalOrders}</span>
        </div>
        <div className="card">
          <h3>Block(s) Sold</h3>
          <span>{quantitySold}</span>
        </div>
        <div className="card">
          <h3>Remaining Stock</h3>
          <span>{remainingStock}</span>
        </div>
      </div>
    </div>
  );
}
