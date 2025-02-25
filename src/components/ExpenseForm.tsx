import React, { useState } from 'react';
import { Expense, defaultCategories } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const availablePersons = ['Ekpenyong', 'Grace', 'Essien', 'Caleb', 'Alexis', 'Shaun']; // Predefined names

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(defaultCategories[0].id);
  const [person, setPerson] = useState('');
  const [filteredPersons, setFilteredPersons] = useState<string[]>([]);

  // Handle input change for "person"
  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPerson(value);

    if (value) {
      const filtered = availablePersons.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPersons(filtered);
    } else {
      setFilteredPersons([]);
    }
  };

  // Handle person selection or when user finishes typing
  const handlePersonSelect = (selectedPerson: string) => {
    setPerson(selectedPerson);
    setFilteredPersons([]); // Clear the filtered list after selection
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !person) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString(),
      person,
    };

    onAddExpense(newExpense);
    setAmount('');
    setDescription('');
    setCategory(defaultCategories[0].id);
    setPerson('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md ">
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Person"
            value={person}
            onChange={handlePersonChange}
            className="border p-2 w-full"
            required
          />
          {filteredPersons.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border mt-1">
              {filteredPersons.map((p) => (
                <li
                  key={p}
                  onClick={() => handlePersonSelect(p)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        >
          {defaultCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Add Expense
        </button>
      </div>
    </form>
  );
}



























// import React, { useState } from 'react';
// import { PlusCircle } from 'lucide-react';
// import { Expense, defaultCategories } from '../types';

// interface ExpenseFormProps {
//   onAddExpense: (expense: Expense) => void;
// }

// export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState(defaultCategories[0].id);
//   const [person, setPerson] = useState(''); // ✅ Added missing person field

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!amount || !description || !person) return; // ✅ Ensure person is required

//     const newExpense: Expense = {
//       id: crypto.randomUUID(),
//       amount: parseFloat(amount),
//       description,
//       category,
//       date: new Date().toISOString(),
//       person, // ✅ Ensure person is included
//     };

//     onAddExpense(newExpense);
//     setAmount('');
//     setDescription('');
//     setCategory(defaultCategories[0].id);
//     setPerson(''); // ✅ Reset person field
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//       <div className="space-y-4">
//         <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 w-full" required />
//         <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" required />
//         <input type="text" placeholder="Person" value={person} onChange={(e) => setPerson(e.target.value)} className="border p-2 w-full" required />
//         <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full">
//           {defaultCategories.map((cat) => (
//             <option key={cat.id} value={cat.id}>{cat.name}</option>
//           ))}
//         </select>
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Expense</button>
//       </div>
//     </form>
//   );
// }

























