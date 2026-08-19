import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { articles } from '@/content/insights';
import { courses } from '@/content/courses';
import { tools } from '@/content/tools';
import { services } from '@/content/services';
import { caseStudies } from '@/content/case-studies';
import { pastCohorts } from '@/content/bootcamp';

/**
 * XML sitemap, generated from the content files — so a new article, course,
 * tool, or case study appears the moment it is added, with no separate step to
 * forget. Tools that are not live and pages that hide themselves when empty
 * (the cohort archive) are excluded.
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
    { url: `${base}/case-studies`, priority: 0.7, changeFrequency: 'monthly' },
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

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // Only listed once a cohort has actually finished — the page 404s until then.
  const archivePages: MetadataRoute.Sitemap =
    pastCohorts.length > 0
      ? [
          {
            url: `${base}/learn/bootcamp/archive`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
          },
        ]
      : [];

  return [
    ...staticPages,
    ...articlePages,
    ...coursePages,
    ...toolPages,
    ...servicePages,
    ...caseStudyPages,
    ...archivePages,
  ];
}
