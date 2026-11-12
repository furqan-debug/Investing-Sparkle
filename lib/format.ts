/**
 * Date formatting.
 *
 * Fixed to en-GB and UTC on purpose: a server-rendered date formatted with the
 * visitor's locale produces a hydration mismatch, and dates on a Pakistani
 * finance site should read the same for everyone.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** PKR amounts, grouped without decimals — e.g. 1,250,000. */
export function formatPKR(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value));
}

/** PKR amounts with two decimals, for prices and per-share figures. */
export function formatPKR2(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** A rate such as 0.15 rendered as 15.0%. */
export function formatPct(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '0%';
  return `${(value * 100).toFixed(digits)}%`;
}

/** A plain grouped number, for shares and units. */
export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
