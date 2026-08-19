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
