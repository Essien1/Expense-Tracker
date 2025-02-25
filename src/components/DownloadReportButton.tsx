import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";

interface DownloadReportButtonProps {
  expenses: { id: string; amount: number; description: string; category: string; date: string; person: string }[];
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({ expenses }) => {
  const handleDownloadReport = () => {
    if (expenses.length === 0) {
      alert("No expense records to generate a report.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Expense Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Date", "Description", "Category", "Person", "Amount"]],
      body: expenses.map((expense) => [
        new Date(expense.date).toLocaleDateString(),
        expense.description,
        expense.category,
        expense.person,
        `$${expense.amount.toFixed(2)}`,
      ]),
    });

    doc.save("expense_report.pdf");
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center"
      onClick={handleDownloadReport}
    >
      <Download className="w-5 h-5 mr-2" /> Download Report
    </button>
  );
};

export default DownloadReportButton;

``





// import React from "react";
// import { Button } from "./ui/Button";

// // import { Button } from "@/components/ui/button";

// const DownloadReportButton = () => {
//   const handleDownloadReport = () => {
//     console.log("Downloading Report...");
//   };

//   return <Button className="mt-4" onClick={handleDownloadReport}>📥 Download Report</Button>;
// };

// export default DownloadReportButton;
