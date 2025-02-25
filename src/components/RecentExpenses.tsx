import React from "react";
import { Expense, defaultCategories } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

interface RecentExpensesProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const RecentExpenses: React.FC<RecentExpensesProps> = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="mt-8 p-4 bg-white shadow-md rounded-lg overflow-x-auto w-full">
      <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
      
      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] sm:min-w-[600px] md:min-w-[700px] lg:min-w-[800px] xl:min-w-[900px] table-auto text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 border-b text-left">S/N</th>
              <th className="px-2 py-2 border-b text-left">Name</th>
              <th className="px-2 py-2 border-b text-left hidden sm:table-cell">Description</th>
              <th className="px-2 py-2 border-b text-left">Category</th>
              <th className="px-2 py-2 border-b text-left">Amount</th>
              <th className="px-2 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id} className="border-b">
                <td className="px-2 py-2">{index + 1}</td>
                <td className="px-2 py-2">{expense.person}</td>
                <td className="px-2 py-2 hidden sm:table-cell">{expense.description}</td>
                <td className="px-2 py-2">
                  {defaultCategories.find((cat) => cat.id === expense.category)?.name || "Unknown"}
                </td>
                <td className="px-2 py-2">₦{formatCurrency(expense.amount)}</td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentExpenses;
