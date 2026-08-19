'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import type { Article, Category } from '@/content/insights';
import { cn } from '@/lib/cn';

/**
 * Category filter + search over the article archive.
 *
 * Filtering happens client-side over the already-rendered list: the archive is
 * small enough that shipping it is cheaper than a round trip, and every article
 * stays in the initial HTML so search engines see the full set regardless of
 * which filter is active.
 */

const PAGE_SIZE = 9;

export function InsightsBrowser({
  articles,
  categories,
}: {
  articles: Article[];
  categories: Category[];
}) {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return articles.filter((a) => {
      if (category !== 'All' && a.category !== category) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [articles, category, query]);

  /*
   * Every matching article is rendered into the DOM and the ones past the
   * current page are hidden with CSS, rather than sliced out of the array.
   * Slicing would leave 12 of the 22 article links out of the server-rendered
   * HTML, costing the internal linking that helps those pages get indexed.
   */

  function choose(next: Category | 'All') {
    setCategory(next);
    setVisible(PAGE_SIZE);
  }

  const tabs: (Category | 'All')[] = ['All', ...categories];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category filter */}
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = category === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                onClick={() => choose(tab)}
                className={cn(
                  'rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'border-green-800 bg-green-800 text-white'
                    : 'border-line bg-white text-ink hover:border-green-300'
                )}
              >
                {tab}
                {tab !== 'All' && (
                  <span className={cn('ml-1.5 text-xs', active ? 'text-green-200' : 'text-muted')}>
                    {articles.filter((a) => a.category === tab).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative lg:w-72">
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search articles"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition-colors focus:border-green-600"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Result count — announced politely so filtering is usable without sight. */}
      <p className="mt-5 text-sm text-muted" role="status" aria-live="polite">
        {filtered.length === articles.length
          ? `${articles.length} articles`
          : `${filtered.length} of ${articles.length} articles`}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <li key={article.slug} className={cn(i >= visible && 'hidden')}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center">
          <p className="font-semibold text-ink">Nothing matches that.</p>
          <p className="mt-1.5 text-sm text-muted">
            Try a different term, or{' '}
            <button
              onClick={() => {
                setQuery('');
                choose('All');
              }}
              className="font-semibold text-green-700 underline underline-offset-2"
            >
              clear the filters
            </button>
            .
          </p>
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-9 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border-2 border-green-800 px-7 py-3 font-semibold text-green-800 transition-colors hover:bg-green-800 hover:text-white"
          >
            Show more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
