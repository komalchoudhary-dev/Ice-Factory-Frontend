// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const SalesReport = () => {
//   const [reportType, setReportType] = useState('Daily');
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false); // 👈 Track fetch attempt

//   const handleShowReport = async () => {
//     try {
//       setLoading(true);
//       setHasFetched(false); // Reset before fetch

//       let formattedDate;

//       if (reportType === 'Monthly') {
//         formattedDate = `${selectedDate.getFullYear()}-${String(
//           selectedDate.getMonth() + 1
//         ).padStart(2, '0')}`;
//       } else if (reportType === 'Yearly') {
//         formattedDate = `${selectedDate.getFullYear()}`;
//       } else {
//         formattedDate = selectedDate.toISOString().split('T')[0];
//       }

//       let apiUrl;

//       if (reportType === 'Daily') {
//         apiUrl = `http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`;
//       } else {
//         apiUrl = `/api/sales-report?type=${reportType}&date=${formattedDate}`;
//       }

//       const response = await axios.get(apiUrl);
//       setReportData(response.data || []);
//     } catch (error) {
//       console.error('API error:', error);
//       alert('Could not fetch report');
//     } finally {
//       setLoading(false);
//       setHasFetched(true); // 👈 Mark fetch as completed
//     }
//   };

//   const handleExportExcel = () => {
//     const numberedData = reportData.map((row, index) => ({
//       '#': index + 1,
//       ...row
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(numberedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
//     XLSX.writeFile(workbook, 'sales_report.xlsx');
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Sales Report', 14, 16);

//     const tableData = reportData.map((row, index) => [index + 1, ...Object.values(row)]);
//     const tableHeaders = ['#', ...Object.keys(reportData[0] || {})];

//     doc.autoTable({
//       head: [tableHeaders],
//       body: tableData,
//       startY: 20,
//     });

//     doc.save('sales_report.pdf');
//   };

//   const renderDatePicker = () => {
//     if (reportType === 'Monthly') {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="MM/yyyy"
//           showMonthYearPicker
//           className="border rounded px-4 py-2"
//         />
//       );
//     } else if (reportType === 'Yearly') {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="yyyy"
//           showYearPicker
//           className="border rounded px-4 py-2"
//         />
//       );
//     } else {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="dd-MM-yyyy"
//           className="border rounded px-4 py-2"
//         />
//       );
//     }
//   };

//   const getFormattedSelectedDate = () => {
//     if (reportType === 'Monthly') {
//       return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }); // April 2025
//     } else if (reportType === 'Yearly') {
//       return selectedDate.getFullYear();
//     } else {
//       return selectedDate.toLocaleDateString('en-GB'); // 14/04/2025
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-black-700 mb-6">Sales Report</h2>

//       <div className="flex flex-wrap items-center gap-3 mb-6">
//         <select
//           value={reportType}
//           onChange={(e) => setReportType(e.target.value)}
//           className="border rounded px-4 py-2"
//         >
//           <option>Daily</option>
//           <option>Monthly</option>
//           <option>Yearly</option>
//         </select>

//         {renderDatePicker()}

//         <button
//           onClick={handleShowReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? 'Loading...' : 'Show Report'}
//         </button>

//         <button
//           onClick={handleExportExcel}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           disabled={!reportData.length}
//         >
//           Export Excel
//         </button>

//         <button
//           onClick={handleExportPDF}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           disabled={!reportData.length}
//         >
//           Export PDF
//         </button>
//       </div>

//       {/* Report Table */}
//       {reportData.length > 0 ? (
//         <div className="overflow-x-auto border rounded">
//           <h3 className="text-xl font-semibold mb-3">
//             Showing report for: <span className="text-blue-700">{getFormattedSelectedDate()}</span>
//           </h3>
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border text-gray-700">#</th>
//                 {Object.keys(reportData[0]).map((key) => (
//                   <th key={key} className="px-4 py-2 border text-gray-700">
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((item, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2 border font-medium">{index + 1}</td>
//                   {Object.values(item).map((val, i) => (
//                     <td key={i} className="px-4 py-2 border">{val}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         hasFetched && !loading && (
//           <div className="text-red-500 mt-4 font-semibold">
//             ⚠️ No report data found for selected <span className="capitalize">{reportType.toLowerCase()}</span> date: <span className="text-blue-700">{getFormattedSelectedDate()}</span>.
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default SalesReport;



// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const SalesReport = () => {
//   const [reportType, setReportType] = useState('Daily');
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [reportData, setReportData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);

//   const handleShowReport = async () => {
//     try {
//       setLoading(true);
//       setHasFetched(false);
//       setStatusFilter('');
//       setFilteredData([]);

//       let formattedDate;
//       if (reportType === 'Monthly') {
//         formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;
//       } else if (reportType === 'Yearly') {
//         formattedDate = `${selectedDate.getFullYear()}`;
//       } else {
//         formattedDate = selectedDate.toISOString().split('T')[0];
//       }

//       let apiUrl = reportType === 'Daily'
//         ? `http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`
//         : `/api/sales-report?type=${reportType}&date=${formattedDate}`;

//       const response = await axios.get(apiUrl);
//       const data = response.data || [];
//       setReportData(data);
//       setFilteredData(data);
//     } catch (error) {
//       console.error('API error:', error);
//       alert('Could not fetch report');
//     } finally {
//       setLoading(false);
//       setHasFetched(true);
//     }
//   };

//   const handleFilterByStatus = () => {
//     if (!statusFilter) {
//       setFilteredData(reportData);
//     } else {
//       const filtered = reportData.filter((row) =>
//         row.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//       setFilteredData(filtered);
//     }
//   };

//   const handleExportExcel = () => {
//     const numberedData = filteredData.map((row, index) => ({
//       '#': index + 1,
//       ...row
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(numberedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
//     XLSX.writeFile(workbook, 'sales_report.xlsx');
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Sales Report', 14, 16);
//     const tableData = filteredData.map((row, index) => [index + 1, ...Object.values(row)]);
//     const tableHeaders = ['#', ...Object.keys(filteredData[0] || {})];

//     doc.autoTable({
//       head: [tableHeaders],
//       body: tableData,
//       startY: 20,
//     });

//     doc.save('sales_report.pdf');
//   };

//   const renderDatePicker = () => {
//     if (reportType === 'Monthly') {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="MM/yyyy"
//           showMonthYearPicker
//           className="border rounded px-4 py-2"
//         />
//       );
//     } else if (reportType === 'Yearly') {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="yyyy"
//           showYearPicker
//           className="border rounded px-4 py-2"
//         />
//       );
//     } else {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="dd-MM-yyyy"
//           className="border rounded px-4 py-2"
//         />
//       );
//     }
//   };

//   const getFormattedSelectedDate = () => {
//     if (reportType === 'Monthly') {
//       return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
//     } else if (reportType === 'Yearly') {
//       return selectedDate.getFullYear();
//     } else {
//       return selectedDate.toLocaleDateString('en-GB');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-black-700 mb-6">Sales Report</h2>

//       <div className="flex flex-wrap items-center gap-3 mb-4">
//         <select
//           value={reportType}
//           onChange={(e) => setReportType(e.target.value)}
//           className="border rounded px-4 py-2"
//         >
//           <option>Daily</option>
//           <option>Monthly</option>
//           <option>Yearly</option>
//         </select>

//         {renderDatePicker()}

//         <button
//           onClick={handleShowReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? 'Loading...' : 'Show Report'}
//         </button>
//       </div>

//       {reportData.length > 0 && (
//         <div className="flex flex-wrap items-center gap-3 mb-6">
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border rounded px-4 py-2"
//           >
//             <option value="">All Status</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="delivered">Delivered</option>
//             <option value="pending">Pending</option>
//             <option value="rejected">Rejected</option>
//             <option value="cancelled">Cancelled</option>
//           </select>

//           <button
//             onClick={handleFilterByStatus}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Filter
//           </button>

//           <button
//             onClick={handleExportExcel}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             disabled={!filteredData.length}
//           >
//             Export Excel
//           </button>

//           <button
//             onClick={handleExportPDF}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             disabled={!filteredData.length}
//           >
//             Export PDF
//           </button>
//         </div>
//       )}

//       {/* Report Table */}
//       {filteredData.length > 0 ? (
//         <div className="overflow-x-auto border rounded">
//           <h3 className="text-xl font-semibold mb-3">
//             Showing report for: <span className="text-blue-700">{getFormattedSelectedDate()}</span>
//           </h3>
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border text-gray-700">#</th>
//                 {Object.keys(filteredData[0]).map((key) => (
//                   <th key={key} className="px-4 py-2 border text-gray-700">
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2 border font-medium">{index + 1}</td>
//                   {Object.values(item).map((val, i) => (
//                     <td key={i} className="px-4 py-2 border">{val}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         hasFetched && !loading && (
//           <div className="text-red-500 mt-4 font-semibold">
//             ⚠️ No report data found for selected <span className="capitalize">{reportType.toLowerCase()}</span> date: <span className="text-blue-700">{getFormattedSelectedDate()}</span>.
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default SalesReport;

// import React, { useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import {
//   format,
//   eachDayOfInterval,
//   startOfMonth,
//   endOfMonth,
//   startOfYear,
//   endOfYear,
// } from "date-fns";

// const SalesReport = () => {
//   const [reportType, setReportType] = useState("Daily");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [salesData, setSalesData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("All");

//   const fetchReport = async () => {
//     setLoading(true);
//     setSalesData([]);

//     try {
//       let datesToFetch = [];

//       if (reportType === "Daily") {
//         datesToFetch = [selectedDate];
//       } else if (reportType === "Monthly") {
//         datesToFetch = eachDayOfInterval({
//           start: startOfMonth(selectedDate),
//           end: endOfMonth(selectedDate),
//         });
//       } else if (reportType === "Yearly") {
//         datesToFetch = eachDayOfInterval({
//           start: startOfYear(selectedDate),
//           end: endOfYear(selectedDate),
//         });
//       } else if (reportType === "Range") {
//         datesToFetch = eachDayOfInterval({ start: startDate, end: endDate });
//       }

//       // Parallel API calls
//       const fetchPromises = datesToFetch.map((date) => {
//         const formattedDate = format(date, "yyyy-MM-dd");
//         return axios.get(
//           `http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`
//         );
//       });

//       const responses = await Promise.all(fetchPromises);
//       let allData = responses.flatMap((res) => res.data);

//       if (statusFilter !== "All") {
//         allData = allData.filter(
//           (order) => order.orderStatus === statusFilter
//         );
//       }

//       setSalesData(allData);
//     } catch (error) {
//       console.error("Error fetching report:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(
//       salesData.map((row, i) => ({ SNo: i + 1, ...row }))
//     );
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
//     XLSX.writeFile(wb, "sales_report.xlsx");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     const tableColumn = ["S.No", ...Object.keys(salesData[0] || {})];
//     const tableRows = salesData.map((row, i) => [i + 1, ...Object.values(row)]);
//     doc.autoTable({ head: [tableColumn], body: tableRows });
//     doc.save("sales_report.pdf");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Sales Report</h1>

//       <div className="flex flex-wrap items-center gap-4 mb-4">
//         {/* Report Type Selector */}
//         <select
//           value={reportType}
//           onChange={(e) => setReportType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="Daily">Daily</option>
//           <option value="Monthly">Monthly</option>
//           <option value="Yearly">Yearly</option>
//           <option value="Range">Range</option>
//         </select>

//         {/* Date Inputs Based on Type */}
//         {reportType === "Daily" && (
//           <input
//             type="date"
//             value={format(selectedDate, "yyyy-MM-dd")}
//             onChange={(e) => setSelectedDate(new Date(e.target.value))}
//             className="border p-2 rounded"
//           />
//         )}

//         {reportType === "Monthly" && (
//           <input
//             type="month"
//             value={format(selectedDate, "yyyy-MM")}
//             onChange={(e) => setSelectedDate(new Date(e.target.value))}
//             className="border p-2 rounded"
//           />
//         )}

//         {reportType === "Yearly" && (
//           <input
//             type="number"
//             min="2000"
//             max="2099"
//             value={format(selectedDate, "yyyy")}
//             onChange={(e) => {
//               const year = parseInt(e.target.value, 10);
//               if (!isNaN(year)) {
//                 setSelectedDate(new Date(`${year}-01-01`));
//               }
//             }}
//             className="border p-2 rounded w-28"
//           />
//         )}

//         {reportType === "Range" && (
//           <>
//             <input
//               type="date"
//               value={format(startDate, "yyyy-MM-dd")}
//               onChange={(e) => setStartDate(new Date(e.target.value))}
//               className="border p-2 rounded"
//             />
//             <input
//               type="date"
//               value={format(endDate, "yyyy-MM-dd")}
//               onChange={(e) => setEndDate(new Date(e.target.value))}
//               className="border p-2 rounded"
//             />
//           </>
//         )}

//         {/* Status Filter */}
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="All">All Status</option>
//           <option value="Pending">Pending</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>

//         {/* Buttons */}
//         <button
//           onClick={fetchReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Loading..." : "Show Report"}
//         </button>

//         <button
//           onClick={exportToExcel}
//           disabled={salesData.length === 0}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Export Excel
//         </button>

//         <button
//           onClick={exportToPDF}
//           disabled={salesData.length === 0}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       {/* Report Table */}
//       {salesData.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2 bg-gray-100">S.No</th>
//                 {Object.keys(salesData[0]).map((key) => (
//                   <th key={key} className="border px-4 py-2 bg-gray-100 text-left">
//                     {key}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {salesData.map((row, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   {Object.values(row).map((value, i) => (
//                     <td key={i} className="border px-4 py-2">
//                       {value}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         !loading && <p className="mt-4 text-gray-600">No data to display.</p>
//       )}
//     </div>
//   );
// };

// export default SalesReport; //Working fine by 10:19



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
  const [statusFilter, setStatusFilter] = useState("All");

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
        console.log("Danik Data:", responseData);
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
        console.log(reportType+"........", responseData);
      }

      if (statusFilter !== "All") {
        responseData = responseData.filter(
          (order) => order.orderStatus === statusFilter
        );
      }

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
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border p-2 rounded"
          />
        )}

        {reportType === "Monthly" && (
          <input
            type="month"
            value={format(selectedDate, "yyyy-MM")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border p-2 rounded"
          />
        )}

        {reportType === "Yearly" && (
          <input
            type="number"
            min="2000"
            max="2099"
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
              value={format(startDate, "yyyy-MM-dd")}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={format(endDate, "yyyy-MM-dd")}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="border p-2 rounded"
            />
          </>
        )}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Status</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>

        </select>

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

        <button
          onClick={exportToPDF}
          disabled={salesData.length === 0}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
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

export default SalesReport;//Working fine by 11:36


