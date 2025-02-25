import React from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  person: string;
}

interface Props {
  expenses: Expense[];
}

const Report: React.FC<Props> = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Expense Report</h2>
      <p>Total Expenses: ${total.toFixed(2)}</p>
    </div>
  );
};

export default Report;
