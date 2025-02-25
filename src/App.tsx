import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen"; // ✅ Added splash screen
import { Wallet } from "lucide-react";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import CategoryBreakdown from "./components/CategoryBreakdown";
import ExpenseSummary from "./components/ExpenseSummary";
import TransactionHistory from "./components/TransactionHistory";
import ExpenseTabs from "./components/ExpenseTabs";
import RecentExpenses from "./components/RecentExpenses";
import { Expense, defaultCategories } from "./types";
import LiveClock from "./components/LiveClock";
import Footer from "./components/Footer";
import MonthlyTrends from "./components/MonthlyTrends";

function App() {
  const [showSplash, setShowSplash] = useState(true); // ✅ Splash screen state
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  // ✅ Load from localStorage on first render
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedRecentExpenses = localStorage.getItem("recentExpenses");
    const storedHistory = localStorage.getItem("transactionHistory");

    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedRecentExpenses) setRecentExpenses(JSON.parse(storedRecentExpenses));
    if (storedHistory) setTransactionHistory(JSON.parse(storedHistory)); 
  }, []);

  // ✅ Save to localStorage when states update
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("recentExpenses", JSON.stringify(recentExpenses));
  }, [recentExpenses]);

  useEffect(() => {
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory)); 
  }, [transactionHistory]);

  // ✅ Hide Splash Screen after 2 seconds
  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000);
  }, []);

  // ✅ Show splash screen before loading the app
  if (showSplash) {
    return <SplashScreen />;
  }

  // ✅ Add Expense to all lists (but only add to history ONCE)
  const handleAddExpense = (expense: Expense) => {
    const newExpense = { ...expense, amount: Number(expense.amount) || 0 };

    setExpenses([newExpense, ...expenses]);
    setRecentExpenses([newExpense, ...recentExpenses]);
    setTransactionHistory([newExpense, ...transactionHistory]); 
  };

  // ✅ Delete Expense only from `expenses`, keeping `transactionHistory` unchanged
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const categoryData = Object.keys(categoryTotals).map((category) => ({
    name: defaultCategories.find((cat) => cat.id === category)?.name || category,
    amount: categoryTotals[category],
  }));

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <>
      <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
            <LiveClock />
          </div>

          <ExpenseSummary expenses={expenses} setShowTransactionHistory={setShowTransactionHistory} />

          <ExpenseTabs activeTab={activeTab} setActiveTab={setActiveTab} expenses={expenses} onDeleteExpense={handleDeleteExpense} />

          {/* Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className={`w-full ${activeTab === "Overview" ? "md:col-span-2" : "md:col-span-3"}`}>
              {activeTab === "Overview" && <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />}
              {activeTab === "Categories" && <CategoryBreakdown categories={categoryData} totalExpense={totalExpense} />}
              {activeTab === "Monthly Trends" && <MonthlyTrends expenses={expenses} />}
            </div>

            {activeTab === "Overview" && (
              <div className="md:col-span-1 w-full md:sticky md:top-8">
                <ExpenseForm onAddExpense={handleAddExpense} />
              </div>
            )}
          </div>

          {activeTab === "Overview" && (
            <div className="mt-6 w-full">
              <RecentExpenses expenses={recentExpenses} onDeleteExpense={handleDeleteExpense} />
            </div>
          )}

          {showTransactionHistory && (
            <TransactionHistory 
              expenses={transactionHistory} 
              onClose={() => setShowTransactionHistory(false)} 
            />
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;


// Original code
  
  
  
  // import React, { useState, useEffect } from "react";
  // import { Wallet } from "lucide-react";
  // import { ExpenseForm } from "./components/ExpenseForm";
  // import { ExpenseList } from "./components/ExpenseList";
  // import CategoryBreakdown from "./components/CategoryBreakdown";
  // import ExpenseSummary from "./components/ExpenseSummary";
  // import TransactionHistory from "./components/TransactionHistory";
  // import ExpenseTabs from "./components/ExpenseTabs";
  // import RecentExpenses from "./components/RecentExpenses";
  // import { Expense, defaultCategories } from "./types";
  // import LiveClock from "./components/LiveClock";
  // import Footer from "./components/Footer";
  // import MonthlyTrends from "./components/MonthlyTrends";

  // function App() {
  //   const [expenses, setExpenses] = useState<Expense[]>([]);
  //   const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  //   const [transactionHistory, setTransactionHistory] = useState<Expense[]>([]); // ✅ Separate history
  //   const [activeTab, setActiveTab] = useState<string>("Overview");
  //   const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  //   // ✅ Load from localStorage on first render
  //   useEffect(() => {
  //     const storedExpenses = localStorage.getItem("expenses");
  //     const storedRecentExpenses = localStorage.getItem("recentExpenses");
  //     const storedHistory = localStorage.getItem("transactionHistory");

  //     if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
  //     if (storedRecentExpenses) setRecentExpenses(JSON.parse(storedRecentExpenses));
  //     if (storedHistory) setTransactionHistory(JSON.parse(storedHistory)); // ✅ Load permanent history
  //   }, []);

  //   // ✅ Save to localStorage when states update
  //   useEffect(() => {
  //     localStorage.setItem("expenses", JSON.stringify(expenses));
  //   }, [expenses]);

  //   useEffect(() => {
  //     localStorage.setItem("recentExpenses", JSON.stringify(recentExpenses));
  //   }, [recentExpenses]);

  //   useEffect(() => {
  //     localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory)); // ✅ Store history separately
  //   }, [transactionHistory]);

  //   // ✅ Add Expense to all lists (but only add to history ONCE)
  //   const handleAddExpense = (expense: Expense) => {
  //     const newExpense = { ...expense, amount: Number(expense.amount) || 0 };

  //     setExpenses([newExpense, ...expenses]);
  //     setRecentExpenses([newExpense, ...recentExpenses]);
  //     setTransactionHistory([newExpense, ...transactionHistory]); // ✅ Add permanently to history
  //   };

  //   // ✅ Delete Expense only from `expenses`, keeping `transactionHistory` unchanged
  //   const handleDeleteExpense = (id: string) => {
  //     setExpenses(expenses.filter((expense) => expense.id !== id)); // ✅ Removes from expense list only
  //   };

  //   const categoryTotals: { [key: string]: number } = {};
  //   expenses.forEach((expense) => {
  //     categoryTotals[expense.category] =
  //       (categoryTotals[expense.category] || 0) + expense.amount;
  //   });

  //   const categoryData = Object.keys(categoryTotals).map((category) => ({
  //     name: defaultCategories.find((cat) => cat.id === category)?.name || category,
  //     amount: categoryTotals[category],
  //   }));

  //   const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  //   return (
  //     <>
  //     <div className="min-h-screen bg-gray-50  w-full overflow-x-hidden">
  //       <div className="max-w-7xl mx-auto px-4 py-8">
  //         {/* HEADER */}
  //         <div className="flex flex-wrap items-center justify-between mb-8">
  //           <div className="flex items-center">
  //             <Wallet className="h-8 w-8 text-blue-600" />
  //             <h1 className="ml-2 text-2xl font-bold text-gray-900">Expense Tracker</h1>
  //           </div>
  //           <LiveClock />
  //         </div>

  //         <ExpenseSummary expenses={expenses} setShowTransactionHistory={setShowTransactionHistory} />

  //         <ExpenseTabs activeTab={activeTab} setActiveTab={setActiveTab} expenses={expenses} onDeleteExpense={handleDeleteExpense} />

  //         {/* Responsive Layout */}
  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  //           {/* Left Column - Dynamic Content */}
  //           <div className={`w-full  ${activeTab === "Overview" ? "md:col-span-2" : "md:col-span-3"}`}>
  //             {activeTab === "Overview" && <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />}
  //             {activeTab === "Categories" && <CategoryBreakdown categories={categoryData} totalExpense={totalExpense} />}
  //             {activeTab === "Monthly Trends" && <MonthlyTrends expenses={expenses} />}
  //           </div>

  //           {/* Right Column - Static Expense Form (Visible only in "Overview") */}
  //           {activeTab === "Overview" && (
  //             <div className="md:col-span-1 w-full md:sticky md:top-8">
  //               <ExpenseForm onAddExpense={handleAddExpense} />
  //             </div>
  //           )}
  //         </div>

  //         {/* ✅ Recent Expenses Section - Mobile Friendly */}
  //         {activeTab === "Overview" && (
  //           <div className="mt-6 w-full">
  //             <RecentExpenses expenses={recentExpenses} onDeleteExpense={handleDeleteExpense} />
  //           </div>
  //         )}

  //         {/* ✅ Transaction History - Uses `transactionHistory` (Permanent) */}
  //         {showTransactionHistory && (
  //           <TransactionHistory 
  //             expenses={transactionHistory} // ✅ Now using transactionHistory
  //             onClose={() => setShowTransactionHistory(false)} 
  //           />
  //         )}
  //       </div>

  //       {/* Sticky Footer */}
      
  //     </div>
  //     {/* <div className=" flex flex-col min-h-[350px] mt-0 pt-0">
  //         <div className="flex-grow"></div>
  //         <Footer />
  //       </div> */}
  //       {/* <Footer /> */}
  //     </>
  //   );
  // }

  // export default App;
