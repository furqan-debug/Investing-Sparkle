import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Info } from 'lucide-react';

import { Section, SectionHeading } from '@/components/ui/Section';
import { ArticleCard } from '@/components/ArticleCard';
import { Newsletter } from '@/components/Newsletter';
import { articles, getArticle, relatedArticles, type Block } from '@/content/insights';
import { site } from '@/content/site';
import { whatsappLink, whatsappMessages } from '@/content/whatsapp';
import { formatDate } from '@/lib/format';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/learn/insights/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
    },
  };
}

/** Renders one content block. Keeps the article template free of raw HTML. */
function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i}>{block.text}</h3>;
    case 'ul':
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <aside
          key={i}
          className="flex gap-3 rounded-2xl border-l-4 border-sparkle-400 bg-sparkle-100 px-5 py-4"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-green-800" aria-hidden />
          <p className="text-sm leading-relaxed text-ink">{block.text}</p>
        </aside>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/learn/insights/${article.slug}`,
  };

  return (
    <>
      <article>
        {/* Header */}
        <header className="bg-green-950 text-white">
          <div className="container-page py-14 md:py-20">
            <Link
              href="/learn/insights"
              className="inline-flex items-center gap-1.5 text-sm text-green-200 hover:text-sparkle-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> All insights
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-sparkle-400 px-3 py-1 text-xs font-semibold text-green-950">
                {article.category}
              </span>
              <time dateTime={article.publishedAt} className="text-green-200">
                {formatDate(article.publishedAt)}
              </time>
              <span className="text-green-300">·</span>
              <span className="text-green-200">{article.readingMinutes} min read</span>
            </div>

            <h1 className="h1 mt-5 max-w-4xl">{article.title}</h1>
            <p className="lede mt-5 max-w-2xl text-green-100">{article.description}</p>
          </div>
        </header>

        {/* Body */}
        <Section tone="paper">
          <div className="prose-article mx-auto max-w-3xl">
            {article.body.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Author box */}
          <div className="mx-auto mt-12 flex max-w-3xl gap-5 rounded-2xl border border-line bg-white p-6">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-green-100 font-display text-2xl text-green-800"
              aria-hidden
            >
              IS
            </span>
            <div>
              <p className="font-sans font-semibold text-ink">{article.author}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                We teach Pakistani investors to understand PSX and manage their own money. We do not
                hold client funds, execute trades, or recommend specific stocks.
              </p>
              <Link
                href="/about"
                className="mt-2 inline-block text-sm font-semibold text-green-700 hover:text-green-600"
              >
                About us →
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-green-900 p-7 text-white">
            <Newsletter variant="dark" />
          </div>

          {/* WhatsApp */}
          <div className="mx-auto mt-6 max-w-3xl">
            <a
              href={whatsappLink(whatsappMessages.articleQuestion(article.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-line bg-white px-6 py-4 font-semibold text-ink transition-colors hover:border-green-300"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden />
              Have a question about this article?
            </a>
          </div>
        </Section>
      </article>

      {related.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Keep reading" title="Related articles." />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
