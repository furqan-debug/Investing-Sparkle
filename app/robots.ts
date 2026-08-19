import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API routes carry no content worth indexing.
      disallow: '/api/',
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
