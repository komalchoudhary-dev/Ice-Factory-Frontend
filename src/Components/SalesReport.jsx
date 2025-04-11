import React, { useState } from "react";
import { Chart } from "chart.js/auto";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../css/styles.css";

const orderData = [
  { date: "2025-04-09", customer: "Aman", quantity: 10, rate: 30 },
  { date: "2025-04-08", customer: "Reema", quantity: 6, rate: 25 },
  { date: "2025-04-07", customer: "Ravi", quantity: 8, rate: 28 },
  { date: "2025-04-01", customer: "Aman", quantity: 5, rate: 30 },
  { date: "2025-04-02", customer: "Reema", quantity: 7, rate: 27 }
];

export default function SalesReport() {
  const [type, setType] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [quantityChart, setQuantityChart] = useState(null);
  const [amountChart, setAmountChart] = useState(null);

  const handleTypeChange = e => {
    setType(e.target.value);
    setSelectedDate("");
    setFiltered([]);
    destroyCharts();
  };

  const getWeekRange = date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(date);
    start.setDate(diff);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  const generateReport = () => {
    if (!selectedDate) return alert("Please select a date");
    const dateObj = new Date(selectedDate);
    const result = orderData.filter(o => {
      const orderDate = new Date(o.date);
      if (type === "daily") return o.date === selectedDate;
      if (type === "weekly") {
        const { start, end } = getWeekRange(dateObj);
        return orderDate >= start && orderDate <= end;
      }
      if (type === "monthly") {
        return orderDate.getFullYear() === dateObj.getFullYear() &&
               orderDate.getMonth() === dateObj.getMonth();
      }
      return false;
    });

    if (result.length === 0) return alert("No data found for selected range.");
    setFiltered(result);
    if (type !== "daily") renderGraphs(result);
  };

  const renderGraphs = (data) => {
    destroyCharts();
    const ctxQty = document.getElementById("quantityChart").getContext("2d");
    const ctxAmt = document.getElementById("amountChart").getContext("2d");

    const labels = [], qty = [], amt = [];
    data.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(o => {
      labels.push(o.date);
      qty.push(o.quantity);
      amt.push(o.quantity * o.rate);
    });

    const qtyChart = new Chart(ctxQty, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Blocks Sold", data: qty, backgroundColor: "#00b4d8" }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: "Quantity per Day" } },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Blocks" } },
          x: { title: { display: true, text: "Date" } }
        }
      }
    });

    const amtChart = new Chart(ctxAmt, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Amount (₹)", data: amt, backgroundColor: "#0077b6" }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: "Amount per Day" } },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Amount (₹)" } },
          x: { title: { display: true, text: "Date" } }
        }
      }
    });

    setQuantityChart(qtyChart);
    setAmountChart(amtChart);
  };

  const destroyCharts = () => {
    quantityChart?.destroy();
    amountChart?.destroy();
  };

  const exportExcel = () => {
    const wb = XLSX.utils.table_to_book(document.getElementById("reportTable"), { sheet: "Report" });
    XLSX.writeFile(wb, "sales_report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 10, 10);
    doc.autoTable({ html: "#reportTable", startY: 20 });
    doc.save("sales_report.pdf");
  };

  const displayData = filtered.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.date.includes(search)
  );

  return (
    <div className="main">
      <div className="main-header">
        <h1>Sales Report</h1>
        <div className="controls">
          <select value={type} onChange={handleTypeChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            type={type === "monthly" ? "month" : "date"}
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
          <button onClick={generateReport}>Show Report</button>
          <input
            type="text"
            placeholder="Search by customer or date"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length > 0 && (
        <>
          {type !== "daily" && (
            <div id="graphSection" style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
              <canvas id="quantityChart" width="400" height="300"></canvas>
              <canvas id="amountChart" width="400" height="300"></canvas>
            </div>
          )}

          <div className="export-buttons" style={{ margin: "1rem 0" }}>
            <button onClick={exportExcel}>Export Excel</button>
            <button onClick={exportPDF}>Export PDF</button>
          </div>

          <table id="reportTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Rate (₹)</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((o, i) => (
                <tr key={i}>
                  <td>{o.date}</td>
                  <td>{o.customer}</td>
                  <td>{o.quantity}</td>
                  <td>₹{o.rate}</td>
                  <td>₹{o.quantity * o.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
