/**
 * Formats a number into a string with commas as thousands separators and two decimal places.
 * @param value - The number to format.
 * @returns The formatted string.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
