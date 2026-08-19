/**
 * Article types, shared by every file in content/articles/.
 *
 * Content is stored as structured blocks rather than raw HTML so headings stay
 * semantic, typography stays consistent, and a CMS can replace these files
 * later without touching the templates.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string };

export type Category = 'Beginner' | 'Intermediate' | 'Market Updates' | 'Advisory';

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: Category;
  /** ISO date. Undated posts are listed in the plan as a trust anti-pattern. */
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: string;
  draft?: boolean;
  /** Slugs of related articles. Falls back to same-category when empty. */
  related?: string[];
  body: Block[];
};
