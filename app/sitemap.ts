import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { articles } from '@/content/insights';
import { courses } from '@/content/courses';
import { tools } from '@/content/tools';

/**
 * XML sitemap, generated from the content files — so a new article or course
 * appears in the sitemap the moment it is added, with no separate step to
 * forget. Tools that are not live yet are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  // `as const` keeps changeFrequency narrowed to the literal union the
  // MetadataRoute.Sitemap type expects, rather than widening it to string.
  const staticPages: MetadataRoute.Sitemap = ([
    { url: `${base}/`, priority: 1, changeFrequency: 'weekly' },
    { url: `${base}/learn`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${base}/learn/bootcamp`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${base}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/learn/courses`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/learn/tools`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/learn/insights`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/faq`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/refund`, priority: 0.4, changeFrequency: 'yearly' },
    { url: `${base}/disclaimer`, priority: 0.4, changeFrequency: 'yearly' },
  ] as const).map((page) => ({ ...page, lastModified: now }));

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => !a.draft)
    .map((a) => ({
      url: `${base}/learn/insights/${a.slug}`,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
      changeFrequency: 'yearly',
      priority: 0.7,
    }));

  const coursePages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${base}/learn/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools
    .filter((t) => t.status === 'live')
    .map((t) => ({
      url: `${base}/learn/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticPages, ...articlePages, ...coursePages, ...toolPages];
}
