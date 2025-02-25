import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <Link to="/add-expense" className="bg-blue-500 text-white p-2 rounded">Add Expense</Link>
      <ul className="mt-4">
        {expenses.map((expense) => (
          <li key={expense._id} className="p-3 border-b">
            {expense.description} - ${expense.amount} - {new Date(expense.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
