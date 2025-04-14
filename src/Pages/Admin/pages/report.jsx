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



import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalesReport = () => {
  const [reportType, setReportType] = useState('Daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleShowReport = async () => {
    try {
      setLoading(true);
      setHasFetched(false);
      setStatusFilter('');
      setFilteredData([]);

      let formattedDate;
      if (reportType === 'Monthly') {
        formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;
      } else if (reportType === 'Yearly') {
        formattedDate = `${selectedDate.getFullYear()}`;
      } else {
        formattedDate = selectedDate.toISOString().split('T')[0];
      }

      let apiUrl = reportType === 'Daily'
        ? `http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}`
        : `/api/sales-report?type=${reportType}&date=${formattedDate}`;

      const response = await axios.get(apiUrl);
      const data = response.data || [];
      setReportData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('API error:', error);
      alert('Could not fetch report');
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const handleFilterByStatus = () => {
    if (!statusFilter) {
      setFilteredData(reportData);
    } else {
      const filtered = reportData.filter((row) =>
        row.status?.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const handleExportExcel = () => {
    const numberedData = filteredData.map((row, index) => ({
      '#': index + 1,
      ...row
    }));
    const worksheet = XLSX.utils.json_to_sheet(numberedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
    XLSX.writeFile(workbook, 'sales_report.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 16);
    const tableData = filteredData.map((row, index) => [index + 1, ...Object.values(row)]);
    const tableHeaders = ['#', ...Object.keys(filteredData[0] || {})];

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 20,
    });

    doc.save('sales_report.pdf');
  };

  const renderDatePicker = () => {
    if (reportType === 'Monthly') {
      return (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border rounded px-4 py-2"
        />
      );
    } else if (reportType === 'Yearly') {
      return (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy"
          showYearPicker
          className="border rounded px-4 py-2"
        />
      );
    } else {
      return (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd-MM-yyyy"
          className="border rounded px-4 py-2"
        />
      );
    }
  };

  const getFormattedSelectedDate = () => {
    if (reportType === 'Monthly') {
      return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } else if (reportType === 'Yearly') {
      return selectedDate.getFullYear();
    } else {
      return selectedDate.toLocaleDateString('en-GB');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-black-700 mb-6">Sales Report</h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option>Daily</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>

        {renderDatePicker()}

        <button
          onClick={handleShowReport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Show Report'}
        </button>
      </div>

      {reportData.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleFilterByStatus}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Filter
          </button>

          <button
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={!filteredData.length}
          >
            Export Excel
          </button>

          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={!filteredData.length}
          >
            Export PDF
          </button>
        </div>
      )}

      {/* Report Table */}
      {filteredData.length > 0 ? (
        <div className="overflow-x-auto border rounded">
          <h3 className="text-xl font-semibold mb-3">
            Showing report for: <span className="text-blue-700">{getFormattedSelectedDate()}</span>
          </h3>
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-gray-700">#</th>
                {Object.keys(filteredData[0]).map((key) => (
                  <th key={key} className="px-4 py-2 border text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border font-medium">{index + 1}</td>
                  {Object.values(item).map((val, i) => (
                    <td key={i} className="px-4 py-2 border">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        hasFetched && !loading && (
          <div className="text-red-500 mt-4 font-semibold">
            ⚠️ No report data found for selected <span className="capitalize">{reportType.toLowerCase()}</span> date: <span className="text-blue-700">{getFormattedSelectedDate()}</span>.
          </div>
        )
      )}
    </div>
  );
};

export default SalesReport;


// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const SalesReport = () => {
//   const [reportType, setReportType] = useState('Daily');
//   const [useRange, setUseRange] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [statusFilter, setStatusFilter] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasFetched, setHasFetched] = useState(false);

//   const formatDate = (date) => date.toISOString().split('T')[0];

//   const getFormattedSelectedDate = () => {
//     if (useRange) {
//       return `${startDate.toLocaleDateString('en-GB')} to ${endDate.toLocaleDateString('en-GB')}`;
//     }
//     if (reportType === 'Monthly') {
//       return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
//     }
//     if (reportType === 'Yearly') {
//       return selectedDate.getFullYear();
//     }
//     return selectedDate.toLocaleDateString('en-GB');
//   };

//   const buildApiUrl = () => {
//     if (useRange) {
//       const sDate = formatDate(startDate);
//       const eDate = formatDate(endDate);
//       return `http://localhost:8080/api/public/orders/delivery-range?startDate=${sDate}&endDate=${eDate}&status=${statusFilter}`;
//     }

//     let formattedDate;
//     if (reportType === 'Monthly') {
//       formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;
//     } else if (reportType === 'Yearly') {
//       formattedDate = `${selectedDate.getFullYear()}`;
//     } else {
//       formattedDate = formatDate(selectedDate);
//     }

//     if (reportType === 'Daily') {
//       return `http://localhost:8080/api/public/orders/detailed?deliveryDate=${formattedDate}&status=${statusFilter}`;
//     } else {
//       return `/api/sales-report?type=${reportType}&date=${formattedDate}&status=${statusFilter}`;
//     }
//   };

//   const fetchReport = async () => {
//     try {
//       setLoading(true);
//       setHasFetched(false);

//       const apiUrl = buildApiUrl();
//       const response = await axios.get(apiUrl);
//       setReportData(response.data || []);
//     } catch (error) {
//       console.error('API error:', error);
//       alert('Could not fetch report');
//     } finally {
//       setLoading(false);
//       setHasFetched(true);
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, [reportType, selectedDate, startDate, endDate, statusFilter, useRange]);

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
//     const tableHeaders = ['#', ...Object.keys(reportData[0] || {})];
//     const tableData = reportData.map((row, index) => [index + 1, ...Object.values(row)]);

//     doc.autoTable({
//       head: [tableHeaders],
//       body: tableData,
//       startY: 20,
//     });

//     doc.save('sales_report.pdf');
//   };

//   const renderDateInputs = () => {
//     if (useRange) {
//       return (
//         <div className="flex gap-2">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             dateFormat="dd-MM-yyyy"
//             className="border rounded px-4 py-2"
//           />
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             dateFormat="dd-MM-yyyy"
//             className="border rounded px-4 py-2"
//           />
//         </div>
//       );
//     }

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
//     }

//     if (reportType === 'Yearly') {
//       return (
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           dateFormat="yyyy"
//           showYearPicker
//           className="border rounded px-4 py-2"
//         />
//       );
//     }

//     return (
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         dateFormat="dd-MM-yyyy"
//         className="border rounded px-4 py-2"
//       />
//     );
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

//         {(reportType === 'Daily' || reportType === 'Monthly') && (
//           <label className="flex items-center gap-1 text-sm">
//             <input
//               type="checkbox"
//               checked={useRange}
//               onChange={() => setUseRange(!useRange)}
//               className="mr-1"
//             />
//             Range
//           </label>
//         )}

//         {renderDateInputs()}

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border rounded px-4 py-2"
//         >
//           <option value="">All Statuses</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="delivered">Delivered</option>
//           <option value="pending">Pending</option>
//           <option value="rejected">Rejected</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         <button
//           onClick={fetchReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? 'Loading...' : 'Refresh'}
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

//       {reportData.length > 0 ? (
//         <div className="overflow-x-auto border rounded">
//           <h3 className="text-xl font-semibold mb-3">
//             Showing report for: <span className="text-blue-700">{getFormattedSelectedDate()}</span>
//           </h3>
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">#</th>
//                 {Object.keys(reportData[0]).map((key) => (
//                   <th key={key} className="px-4 py-2 border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((row, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2 border font-medium">{index + 1}</td>
//                   {Object.values(row).map((val, i) => (
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
