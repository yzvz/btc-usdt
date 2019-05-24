function formatPrice(price: string, digits: number): string {
  return Number.parseFloat(price).toFixed(digits);
}

export { formatPrice };
