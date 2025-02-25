import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDFReport = (expenses: any[]) => {
  const doc = new jsPDF();
  doc.text("Expense Report", 14, 10);
  
  autoTable(doc, {
    head: [["Description", "Amount", "Date", "Person"]],
    body: expenses.map((exp) => [exp.description, `$${exp.amount}`, exp.date, exp.person]),
  });

  doc.save("ExpenseReport.pdf");
};
