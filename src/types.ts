// types.ts
export interface Expense {
  id: string;
  date: string;
  person: string;
  description: string;
  category: string;
  amount: number;
}

  
  export interface ExpenseCategory {
    id: string;
    name: string;
    color: string;
  }
  
  export const defaultCategories: ExpenseCategory[] = [
    { id: '1', name: 'Food & Dining', color: '#FF6B6B' },
    { id: '2', name: 'Transportation', color: '#4ECDC4' },
    { id: '3', name: 'Shopping', color: '#45B7D1' },
    { id: '4', name: 'Bills & Utilities', color: '#96CEB4' },
    { id: '5', name: 'Entertainment', color: '#FFEEAD' },
    { id: '6', name: 'Other', color: '#D4D4D4' },
  ];