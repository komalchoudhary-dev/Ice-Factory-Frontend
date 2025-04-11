import React, { useState } from "react";
import "../css/styles.css";

const initialConsumers = [
  { name: "Aman", rate: 30, address: "MG Road", contact: "9999999999" },
  { name: "Reema", rate: 28, address: "Kankarbagh", contact: "8888888888" },
  { name: "Ravi", rate: 25, address: "Patliputra", contact: "7777777777" }
];

export default function Consumer() {
  const [consumers, setConsumers] = useState(initialConsumers);
  const [search, setSearch] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", rate: "", address: "", contact: "" });

  const filteredConsumers = consumers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.includes(search)
  );

  const handleSubmit = () => {
    const { name, rate, address, contact } = formData;
    if (!name || !rate || !address || !contact) {
      alert("Please fill all fields correctly.");
      return;
    }

    const updated = { name, rate: parseFloat(rate), address, contact };

    if (editingIndex !== null) {
      const updatedList = [...consumers];
      updatedList[editingIndex] = updated;
      setConsumers(updatedList);
      setEditingIndex(null);
    } else {
      setConsumers(prev => [...prev, updated]);
    }

    setFormVisible(false);
    setFormData({ name: "", rate: "", address: "", contact: "" });
  };

  const handleEdit = index => {
    setEditingIndex(index);
    setFormData(consumers[index]);
    setFormVisible(true);
  };

  const handleDelete = index => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setConsumers(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="main">
      <div className="main-header">
        <h1>Consumers</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search consumers"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="add-btn" onClick={() => { setEditingIndex(null); setFormVisible(!formVisible); }}>
            + Add New Customer
          </button>
        </div>
      </div>

      {formVisible && (
        <div id="addCustomerForm">
          <h3 id="formCustomerTitle">{editingIndex !== null ? "Edit Customer" : "Add New Customer"}</h3>
          <div className="form-grid">
            <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input type="number" placeholder="Rate" value={formData.rate} onChange={e => setFormData({ ...formData, rate: e.target.value })} />
            <input placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
            <input placeholder="Contact" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
          </div>
          <button style={{ marginTop: "1rem" }} onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <table id="consumerTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rate (₹)</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsumers.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>₹{c.rate}</td>
              <td>{c.address}</td>
              <td>{c.contact}</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(i)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
