function formatPrice(price: string | number, digits: number = 2): string {
  if (typeof price === 'number') {
    price = price.toString();
  }

  return Number.parseFloat(price).toFixed(digits);
}

export { formatPrice };
