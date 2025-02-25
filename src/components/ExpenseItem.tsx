const ExpenseItem = ({ expense, onDelete }: { expense: any; onDelete: (id: string) => void }) => {
  return (
    <li className="border p-2 mb-2 flex justify-between">
      <div>
        <p className="font-semibold">{expense.description}</p>
        <p>${expense.amount} - {expense.date}</p>
        <p className="text-gray-500">Paid by: {expense.person}</p>
      </div>
      <button onClick={() => onDelete(expense.id)} className="text-red-500">Delete</button>
    </li>
  );
};

export default ExpenseItem;
