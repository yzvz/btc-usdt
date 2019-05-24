function formatPrice(price: string|number, digits?: number|undefined): string {
  if (digits === undefined) {
    digits = 2;
  }

  if (typeof price === 'number') {
    price = price.toString();
  }

  return Number.parseFloat(price).toFixed(digits);
}

export { formatPrice };
