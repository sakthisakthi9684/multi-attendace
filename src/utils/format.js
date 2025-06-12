export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatAddress = (address) => {
  if (!address) return "";
  return address
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join("\n");
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount || 0);
