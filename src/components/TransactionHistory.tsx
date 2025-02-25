import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { formatCurrency } from "../utils/formatCurrency";

interface Expense {
  id: string;
  date: string;
  person: string;
  description: string;
  category: string;
  amount: number;
}

interface TransactionHistoryProps {
  expenses: Expense[]; // ✅ Accept expenses as a prop from `App.tsx`
  onClose: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ expenses, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Filter transactions based on search & date range
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      (!startDate || new Date(expense.date) >= new Date(startDate)) &&
      (!endDate || new Date(expense.date) <= new Date(endDate));

    return matchesSearch && matchesDate;
  });

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction History</h2>

        {/* Filter & Search Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="border p-2 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-xs sm:text-sm">
                <th className="border p-2">Date</th>
                <th className="border p-2">Person</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border text-xs sm:text-sm">
                  <td className="border p-2">{expense.date}</td>
                  <td className="border p-2">{expense.person}</td>
                  <td className="border p-2">{expense.description}</td>
                  <td className="border p-2">{expense.category}</td>
                  <td className="border p-2">{formatCurrency(expense.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export & Close Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
          <CSVLink
            data={filteredExpenses}
            filename="transactions.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded text-center"
          >
            Download CSV
          </CSVLink>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded text-center">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// export default TransactionHistory;

// // import React, { useState, useEffect } from "react";
// import { CSVLink } from "react-csv";
// import { formatCurrency } from "../utils/formatCurrency";

// interface Expense {
//   id: string;
//   date: string;
//   person: string;
//   description: string;
//   category: string;
//   amount: number;
// }

// interface TransactionHistoryProps {
//   onClose: () => void;
// }

// const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onClose }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [transactionHistory, setTransactionHistory] = useState<Expense[]>([]);
//   const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // Default to current month

//   // ✅ Load transaction history from localStorage
//   useEffect(() => {
//     const storedHistory = localStorage.getItem("transactionHistory");
//     if (storedHistory) {
//       setTransactionHistory(JSON.parse(storedHistory));
//     }
//   }, []);

//   // ✅ Save transaction history to localStorage when it updates
//   useEffect(() => {
//     localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
//   }, [transactionHistory]);

//   // ✅ Filter transactions based on month, search & date range
//   const filteredExpenses = transactionHistory.filter((expense) => {
//     const expenseMonth = new Date(expense.date).toISOString().slice(0, 7); // Format: YYYY-MM

//     const matchesMonth = expenseMonth === selectedMonth;
//     const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDate =
//       (!startDate || new Date(expense.date) >= new Date(startDate)) &&
//       (!endDate || new Date(expense.date) <= new Date(endDate));

//     return matchesMonth && matchesSearch && matchesDate;
//   });

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-auto">
//         <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction History</h2>

//         {/* Month Selector */}
//         <div className="mb-4">
//           <label className="font-semibold text-sm sm:text-base">Select Month:</label>
//           <input
//             type="month"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="border p-2 rounded w-full mt-1"
//           />
//         </div>

//         {/* Filter & Search Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Search transactions..."
//             className="border p-2 rounded w-full"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <input
//             type="date"
//             className="border p-2 rounded w-full"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <input
//             type="date"
//             className="border p-2 rounded w-full"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>

//         {/* Transactions Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
//             <thead>
//               <tr className="bg-gray-100 text-xs sm:text-sm">
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Person</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2">Category</th>
//                 <th className="border p-2">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredExpenses.length > 0 ? (
//                 filteredExpenses.map((expense) => (
//                   <tr key={expense.id} className="border text-xs sm:text-sm">
//                     <td className="border p-2">{expense.date}</td>
//                     <td className="border p-2">{expense.person}</td>
//                     <td className="border p-2">{expense.description}</td>
//                     <td className="border p-2">{expense.category}</td>
//                     <td className="border p-2">{formatCurrency(expense.amount)}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center text-gray-500 p-4">
//                     No transactions for this month
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Export & Close Buttons */}
//         <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
//           <CSVLink
//             data={filteredExpenses}
//             filename={`transactions-${selectedMonth}.csv`}
//             className="bg-blue-500 text-white px-4 py-2 rounded text-center"
//           >
//             Download CSV
//           </CSVLink>
//           <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded text-center">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default TransactionHistory;