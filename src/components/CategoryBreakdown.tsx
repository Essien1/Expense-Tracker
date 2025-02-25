import React from "react";

interface Category {
  name: string;
  amount: number;
}

interface CategoryBreakdownProps {
  categories: Category[];
  totalExpense: number;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories, totalExpense }) => {
  return (
    <div className="max-w-full p-4 bg-white shadow-md rounded-lg mt-2 w-[800px]">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      {categories.map((category, index) => {
        const percentage = totalExpense > 0 ? (category.amount / totalExpense) * 100 : 0;

        return (
          <div key={index} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-gray-800 font-medium">{category.name}</span>
              <span className="text-gray-600">₦{category.amount.toFixed(2)} ({percentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBreakdown;
