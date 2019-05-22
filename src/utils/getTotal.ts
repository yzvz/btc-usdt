function getTotal(price: string, amount: string): string {
  const parsedPrice = parseFloat(price);
  const parsedAmount = parseFloat(amount);
  
  if (isNaN(parsedPrice) || isNaN(parsedAmount)) {
    return ''
  }

  return (parsedPrice * parsedAmount).toFixed(8);
}

export { getTotal };