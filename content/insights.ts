import { foundationArticles } from './articles/sets/foundations';
import { analysisArticles } from './articles/sets/analysis';
import { practicalArticles } from './articles/sets/practical';
import { behaviourArticles } from './articles/sets/behaviour';
import type { Article, Block, Category } from './articles/types';

export type { Article, Block, Category };

/**
 * The article registry.
 *
 * Articles live in themed files under content/articles/sets/ so no single file
 * becomes unmanageable. Add a set here and the listing page, category filters,
 * related-article logic, and the sitemap all pick it up automatically.
 */
export const articles: Article[] = [
  ...foundationArticles,
  ...analysisArticles,
  ...practicalArticles,
  ...behaviourArticles,
];

export const categories: Category[] = ['Beginner', 'Intermediate', 'Market Updates', 'Advisory'];

/** Categories that actually have published articles — used for the filter bar. */
export function activeCategories(): Category[] {
  return categories.filter((c) => publishedArticles.some((a) => a.category === c));
}

export const publishedArticles: Article[] = articles
  .filter((a) => !a.draft)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Related articles for a given article.
 *
 * Prefers the explicit `related` slugs an author set, then fills any remaining
 * slots from the same category, then from anything else — so the section is
 * never short and never links an article to itself.
 */
export function relatedArticles(article: Article, count = 3): Article[] {
  const picked: Article[] = [];
  const seen = new Set([article.slug]);

  const add = (candidate: Article | undefined) => {
    if (!candidate || seen.has(candidate.slug) || picked.length >= count) return;
    seen.add(candidate.slug);
    picked.push(candidate);
  };

  article.related?.forEach((slug) => add(publishedArticles.find((a) => a.slug === slug)));
  publishedArticles.filter((a) => a.category === article.category).forEach(add);
  publishedArticles.forEach(add);

  return picked;
}

/** Guards against a duplicate slug silently shadowing an article. */
const duplicateSlugs = articles
  .map((a) => a.slug)
  .filter((slug, i, all) => all.indexOf(slug) !== i);

if (duplicateSlugs.length > 0) {
  throw new Error(`Duplicate article slugs: ${duplicateSlugs.join(', ')}`);
}
