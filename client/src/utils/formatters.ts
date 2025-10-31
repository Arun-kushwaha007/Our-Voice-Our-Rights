// Placeholder for formatting functions
export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatNumber = (value: number, isCurrency = false): string => {
  if (isCurrency) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};
