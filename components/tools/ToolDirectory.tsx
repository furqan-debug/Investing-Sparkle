'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

import { cn } from '@/lib/cn';
import { getCategory, type Tool, type ToolCategory } from '@/content/tools';

/**
 * Searchable directory of every tool.
 *
 * The registry is passed in from the server page, so the client bundle only
 * carries the fields shown here. Unfinished tools remain visible but disabled,
 * which sets expectations better than hiding them.
 */

export function ToolDirectory({
  items,
  categories,
}: {
  items: Tool[];
  categories: ToolCategory[];
}) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('all');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return items.filter((tool) => {
      if (active !== 'all' && tool.category !== active) return false;
      if (!needle) return true;
      return `${tool.name} ${tool.blurb} ${tool.outcome}`.toLowerCase().includes(needle);
    });
  }, [items, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-low"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${items.length} tools`}
            aria-label="Search tools"
            className="w-full rounded-full border border-line bg-[var(--bg-inset)] py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-low focus:border-sparkle-400/70 focus:ring-2 focus:ring-sparkle-400/15"
          />
        </div>

        <p className="mono-label text-[10px]">
          {filtered.length} of {items.length} tools
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
            active === 'all'
              ? 'border-sparkle-400/30 bg-sparkle-400/[0.08] text-sparkle-200'
              : 'border-line text-muted hover:border-white/20 hover:text-ink'
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActive(category.slug)}
            aria-pressed={active === category.slug}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              active === category.slug
                ? 'border-sparkle-400/30 bg-sparkle-400/[0.08] text-sparkle-200'
                : 'border-line text-muted hover:border-white/20 hover:text-ink'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-white/[0.018] p-8 text-center">
          <p className="text-sm text-ink">Nothing matches “{query}”.</p>
          <p className="mt-2 text-xs text-muted">
            Try a shorter phrase, or tell us what you need on WhatsApp and we will consider it.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => {
            const category = getCategory(tool.category);
            const isLive = tool.status === 'live';

            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-sm font-semibold leading-snug text-ink">
                    {tool.name}
                  </h3>
                  {!isLive && (
                    <span className="mono-label shrink-0 rounded-full border border-sparkle-400/25 bg-sparkle-400/[0.06] px-2 py-1 text-[9px] text-sparkle-300">
                      Soon
                    </span>
                  )}
                </div>

                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{tool.blurb}</p>

                <div className="mt-4 border-t border-line pt-3">
                  <p className="mono-label text-[9px]">{category?.name ?? 'Free tool'}</p>
                  {isLive ? (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-sparkle-300">
                      Open tool <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  ) : (
                    <span className="mt-2 block text-xs text-low">In the queue</span>
                  )}
                </div>
              </>
            );

            return (
              <li key={tool.slug}>
                {isLive ? (
                  <Link href={`/learn/tools/${tool.slug}`} className="card flex h-full flex-col p-5">
                    {body}
                  </Link>
                ) : (
                  <div className="card flex h-full flex-col p-5 opacity-65">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
