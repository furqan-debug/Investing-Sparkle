/** Minimal class-name joiner. Keeps conditional Tailwind classes readable. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
