/**
 * Format a number into USD currency format deterministically (e.g. 5250000 -> "$5,250,000")
 * Prevents SSR locale-dependent hydration mismatches.
 */
export function formatCurrency(amount: number, period?: string): string {
  const parts = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formatted = `$${parts}`;

  return period ? `${formatted}${period}` : formatted;
}

/**
 * Format square meters area deterministically (e.g. 4200 -> "4,200 m²")
 * Prevents SSR locale-dependent hydration mismatches.
 */
export function formatArea(areaInSquareMeters: number): string {
  const parts = Math.round(areaInSquareMeters)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${parts} m²`;
}
