import React from "react";
import { Expense, defaultCategories } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void; // Function to delete an expense
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md w-full sm:w-[800px]">
      <ul role="list" className="divide-y divide-gray-200">
        {expenses.map((expense) => {
          const category = defaultCategories.find((c) => c.id === expense.category);
          return (
            <li key={expense.id} className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              {/* Left side: Display person's name, description, and category */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm">
                <p className="font-medium text-gray-900">{expense.person}</p>
                <p className="text-gray-500">{expense.description}</p>
                <p className="text-gray-500">{category ? category.name : "Uncategorized"}</p>
              </div>

              {/* Right side: Display the amount and delete button */}
              <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(expense.amount)}</span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
