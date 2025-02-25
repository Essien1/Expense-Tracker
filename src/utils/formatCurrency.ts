export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN", // Change from USD to NGN (Naira)
    minimumFractionDigits: 2,
  }).format(amount);
};
