import { createContext, useState, ReactNode } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  person: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => setExpenses([...expenses, expense]);

  const deleteExpense = (id: string) => setExpenses(expenses.filter(exp => exp.id !== id));

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
