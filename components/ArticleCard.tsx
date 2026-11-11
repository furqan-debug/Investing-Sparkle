import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Article } from '@/content/insights';
import { formatDate } from '@/lib/format';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card group relative flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="mono-label rounded-full border border-sparkle-400/20 bg-sparkle-400/[0.05] px-2.5 py-1 text-[10px] text-sparkle-300">
          {article.category}
        </span>
        <time dateTime={article.publishedAt} className="mono-label text-[10px]">
          {formatDate(article.publishedAt)}
        </time>
      </div>

      <h3 className="mt-5 font-sans text-lg font-semibold leading-snug text-ink">
        <Link href={`/learn/insights/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.description}</p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sparkle-300">
          Read article
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
        <span className="mono-label text-[10px]">{article.readingMinutes} min</span>
      </div>
    </article>
  );
}
