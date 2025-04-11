import React, { useState, useEffect } from "react";
import "../css/styles.css"; 

const initialOrders = [
  { id: "O001", name: "Aman", qty: 10, rate: 30, address: "MG Road", contact: "9999999999", status: "pending", date: "2025-04-09" },
  { id: "O002", name: "Reema", qty: 15, rate: 28, address: "Kankarbagh", contact: "8888888888", status: "confirmed", date: "2025-04-09" },
  { id: "O003", name: "Ravi", qty: 20, rate: 25, address: "Patliputra", contact: "7777777777", status: "delivered", date: "2025-04-08" },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    qty: "",
    rate: "",
    address: "",
    contact: "",
    status: ""
  });

  const filteredOrders = orders.filter(order => {
    const matchDate = selectedDate ? order.date === selectedDate : true;
    const matchStatus = filterStatus ? order.status === filterStatus : true;
    const matchSearch = order.name.toLowerCase().includes(search.toLowerCase()) || order.id.toLowerCase().includes(search.toLowerCase());
    return matchDate && matchStatus && matchSearch;
  });

  const toggleForm = () => {
    if (editingId) {
      const editOrder = orders.find(o => o.id === editingId);
      if (editOrder) setFormData(editOrder);
    } else {
      setFormData({ id: "", name: "", qty: "", rate: "", address: "", contact: "", status: "" });
    }
    setFormVisible(prev => !prev);
  };

  const handleEdit = id => {
    setEditingId(id);
    const order = orders.find(o => o.id === id);
    if (order) {
      setFormData(order);
      setFormVisible(true);
    }
  };

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };

  const handleSubmit = () => {
    const { id, name, qty, rate, address, contact, status } = formData;
    if (id && name && qty && rate && address && contact && ["pending", "confirmed", "delivered"].includes(status)) {
      const newOrder = {
        id,
        name,
        qty: parseInt(qty),
        rate: parseInt(rate),
        address,
        contact,
        status,
        date: new Date().toISOString().slice(0, 10)
      };
      if (editingId) {
        setOrders(prev => prev.map(o => o.id === editingId ? newOrder : o));
        setEditingId(null);
      } else {
        setOrders(prev => [...prev, newOrder]);
      }
      setFormVisible(false);
      setFormData({ id: "", name: "", qty: "", rate: "", address: "", contact: "", status: "" });
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const statusClass = status => {
    return filterStatus === status ? "card " + status + " active" : "card " + status;
  };

  return (
    <div className="main">
      <div className="main-header">
        <h1>Orders</h1>
        <div className="date-box">
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </div>
      </div>

      <div className="orders-section dashboard-section">
        <div className={statusClass("pending")} onClick={() => setFilterStatus(filterStatus === "pending" ? "" : "pending")}>
          <h3>Pending</h3>
          <span>—</span>
        </div>
        <div className={statusClass("confirmed")} onClick={() => setFilterStatus(filterStatus === "confirmed" ? "" : "confirmed")}>
          <h3>Confirmed</h3>
          <span>—</span>
        </div>
        <div className={statusClass("delivered")} onClick={() => setFilterStatus(filterStatus === "delivered" ? "" : "delivered")}>
          <h3>Delivered</h3>
          <span>—</span>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or order ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={() => { setEditingId(null); toggleForm(); }}>
          + Add New Order
        </button>
      </div>

      {formVisible && (
        <div id="addOrderForm">
          <h3 id="formTitle">{editingId ? "Edit Order" : "Add New Order"}</h3>
          <div className="form-grid">
            <input type="text" placeholder="Order ID" value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} />
            <input type="text" placeholder="Customer Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input type="number" placeholder="Quantity (blocks)" value={formData.qty} onChange={e => setFormData({ ...formData, qty: e.target.value })} />
            <input type="number" placeholder="Rate (₹ per block)" value={formData.rate} onChange={e => setFormData({ ...formData, rate: e.target.value })} />
            <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
            <input type="text" placeholder="Contact Number" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <button style={{ marginTop: "1rem" }} onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <table id="ordersTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Block(s)</th>
            <th>Rate (₹)</th>
            <th>Total (₹)</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} className={`status-${order.status}`}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td>₹{order.rate}</td>
              <td>₹{order.qty * order.rate}</td>
              <td>{order.address}</td>
              <td>{order.contact}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(order.id)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
