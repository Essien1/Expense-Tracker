  import React from "react";
  // import DownloadReportButton from "./DownloadReportButton";
  import { BarChart3, Folder, LineChart, Trash2 } from "lucide-react";

  interface ExpenseTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    expenses: { id: string; amount: number; category: string; date: string }[];
    onDeleteExpense: (id: string) => void;
  }

  const ExpenseTabs: React.FC<ExpenseTabsProps> = ({ activeTab, setActiveTab, expenses, onDeleteExpense }) => {
    const tabs = [
      { name: "Overview", icon: <BarChart3 className="inline-block w-5 h-5 mr-2" /> },
      { name: "Categories", icon: <Folder className="inline-block w-5 h-5 mr-2" /> },
      { name: "Monthly Trends", icon: <LineChart className="inline-block w-5 h-5 mr-2" /> }
    ];

    return (
      <div className="flex flex-wrap justify-between items-center border-b pb-2 mb-4 px-2 md:px-4">
        <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-3 py-2 flex items-center transition duration-200 text-sm sm:text-base md:text-lg lg:text-xl ${
              activeTab === tab.name
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>
      {/* <DownloadReportButton className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" expenses={expenses} /> */}

      {/* {activeTab === "Overview" && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="border-b py-2 flex justify-between items-center">
                <span>
                  <strong>{expense.category}</strong>: ${expense.amount.toFixed(2)} ({new Date(expense.date).toLocaleDateString()})
                </span>
                <button onClick={() => onDeleteExpense(expense.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default ExpenseTabs;
