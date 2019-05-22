function formatPercent(percent: string): string {
  const parsedPercent = parseFloat(percent);

  if (isNaN(parsedPercent)) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  return formatter.format(parsedPercent / 100);
}

export { formatPercent };