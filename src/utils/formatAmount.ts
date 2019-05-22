function formatAmount(amount: string): string {
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount)) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  });

  return formatter.format(parsedAmount);
}

export { formatAmount }