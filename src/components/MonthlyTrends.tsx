import React from "react";
import { Expense } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

interface MonthlyTrendsProps {
  expenses: Expense[];
}

const MonthlyTrends: React.FC<MonthlyTrendsProps> = ({ expenses }) => {
  // Organize expenses by month
  const monthlyData: { [key: string]: number } = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "long", year: "numeric" });
    monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Monthly Trends</h2>
      
      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] sm:min-w-[600px] md:min-w-[700px] lg:min-w-[800px] xl:min-w-[900px] table-auto text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 border-b text-left">Month</th>
              <th className="px-2 py-2 border-b text-left">Total Expenses</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(monthlyData).map(([month, total]) => (
              <tr key={month} className="border-b">
                <td className="px-2 py-2">{month}</td>
                <td className="px-2 py-2">{formatCurrency(total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyTrends;
