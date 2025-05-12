import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

const SalesReport = () => {
  const [reportType, setReportType] = useState("Daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const todayStr = format(new Date(), "yyyy-MM-dd");

  const fetchReport = async () => {
    setLoading(true);
    setSalesData([]);

    try {
      let responseData = [];

      if (reportType === "Daily") {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const res = await axios.get(
          `http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`
        );
        responseData = res.data;
      } else {
        let start, end;

        if (reportType === "Monthly") {
          start = startOfMonth(selectedDate);
          end = endOfMonth(selectedDate);
        } else if (reportType === "Yearly") {
          start = startOfYear(selectedDate);
          end = endOfYear(selectedDate);
        } else if (reportType === "Range") {
          start = startDate;
          end = endDate;
        }

        const startStr = format(start, "yyyy-MM-dd");
        const endStr = format(end, "yyyy-MM-dd");

        const res = await axios.get(
          `http://localhost:8080/api/public/orders/delivery-range?startDate=${startStr}&endDate=${endStr}`
        );
        responseData = res.data;
      }

      // Always filter to delivered
      responseData = responseData.filter(
        (order) => order.orderStatus === "delivered"
      );

      setSalesData(responseData);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      salesData.map((row, i) => ({ SNo: i + 1, ...row }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "sales_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["S.No", ...Object.keys(salesData[0] || {})];
    const tableRows = salesData.map((row, i) => [i + 1, ...Object.values(row)]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("sales_report.pdf");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Sales Report</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Range">Range</option>
        </select>

        {reportType === "Daily" && (
          <input
            type="date"
            max={todayStr}
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border p-2 rounded"
          />
        )}

        {reportType === "Monthly" && (
          <input
            type="month"
            max={format(new Date(), "yyyy-MM")}
            value={format(selectedDate, "yyyy-MM")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border p-2 rounded"
          />
        )}

        {reportType === "Yearly" && (
          <input
            type="number"
            min="2000"
            max={format(new Date(), "yyyy")}
            value={format(selectedDate, "yyyy")}
            onChange={(e) => {
              const year = parseInt(e.target.value, 10);
              if (!isNaN(year)) {
                setSelectedDate(new Date(`${year}-01-01`));
              }
            }}
            className="border p-2 rounded w-28"
          />
        )}

        {reportType === "Range" && (
          <>
            <input
              type="date"
              max={todayStr}
              value={format(startDate, "yyyy-MM-dd")}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="border p-2 rounded"
            />
            <input
              type="date"
              max={todayStr}
              value={format(endDate, "yyyy-MM-dd")}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="border p-2 rounded"
            />
          </>
        )}

        <button
          onClick={fetchReport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Show Report"}
        </button>

        <button
          onClick={exportToExcel}
          disabled={salesData.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export Excel
        </button>

        {/* <button
          onClick={exportToPDF}
          disabled={salesData.length === 0}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export PDF
        </button> */}
      </div>

      {salesData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-100">S.No</th>
                {Object.keys(salesData[0]).map((key) => (
                  <th key={key} className="border px-4 py-2 bg-gray-100 text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border px-4 py-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="mt-4 text-gray-600">No data to display.</p>
      )}
    </div>
  );
};

export default SalesReport;//Working fine by 15:04 01-05-2025
