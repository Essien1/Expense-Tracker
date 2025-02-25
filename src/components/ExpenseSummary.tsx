import { formatCurrency } from "../utils/formatCurrency";
// import LiveClock from "./LiveClock";

interface ExpenseSummaryProps {
  setShowTransactionHistory: (value: boolean) => void;
  expenses: { amount: number }[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ setShowTransactionHistory, expenses }) => {
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? parseFloat((totalExpenses / expenses.length).toFixed(2)) : 0;

  return (
    <div className=" mb-5 px-2 sm:px-4">
      {/* Header with Live Clock */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Expense Summary</h2>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Total Expenses */}
        <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">Total Expenses</h3>
          <p className="text-lg sm:text-xl font-bold">{formatCurrency(totalExpenses)}</p>
        </div>

        {/* Average Expense */}
        <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">Average Expense</h3>
          <p className="text-lg sm:text-xl font-bold">₦{averageExpense}</p>
        </div>

        {/* Total Transactions */}
        <div
          className="p-4 mb-4 bg-yellow-100 rounded-lg shadow-md text-center cursor-pointer hover:bg-yellow-200 transition"
          onClick={() => setShowTransactionHistory(true)}
        >
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">Total Transactions</h3>
          <p className="text-lg sm:text-xl font-bold">{expenses.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
