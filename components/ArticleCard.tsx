import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Article } from '@/content/insights';
import { formatDate } from '@/lib/format';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card group relative flex h-full flex-col border-l-4 border-l-green-500 p-6">
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">
          {article.category}
        </span>
        <time dateTime={article.publishedAt} className="text-muted">
          {formatDate(article.publishedAt)}
        </time>
      </div>

      <h3 className="mt-4 font-sans text-lg font-semibold leading-snug text-ink">
        <Link href={`/learn/insights/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{article.description}</p>

      <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-green-700">
        Read article
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
        <span className="ml-auto text-xs font-normal text-muted">
          {article.readingMinutes} min read
        </span>
      </p>
    </article>
  );
}
