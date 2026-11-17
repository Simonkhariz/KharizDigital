/** Fixed en-US formatting so server and client render the same text. */
export function money(value: number, digits = 2): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** Dollars with a true minus sign for negative amounts. */
export function usd(value: number): string {
  return `${value < 0 ? "−" : ""}$${money(Math.abs(value))}`;
}

/** Splits an amount into whole and cents so the cents can be set smaller. */
export function splitAmount(value: number): { whole: string; cents: string } {
  const [whole, cents] = money(Math.abs(value)).split(".");
  return { whole, cents };
}
