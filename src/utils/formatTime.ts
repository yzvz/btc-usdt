function addZeroes(n: number): string | number {
  return n < 10 ? '0' + n : n;
}

function formatTime(ms: number): string {
  const d = new Date(ms);
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => addZeroes(n)).join(':');
}

export { formatTime };
