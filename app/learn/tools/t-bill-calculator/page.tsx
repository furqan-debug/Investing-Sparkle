import type { Metadata } from 'next';

import { ToolPage } from '@/components/tools/ToolPage';
import { TBillCalculator } from '@/components/tools/TBillCalculator';
import { toolPages } from '@/content/tool-pages';
import { site } from '@/content/site';

const content = toolPages['t-bill-calculator'];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: `/learn/tools/${content.slug}` },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: content.title,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: `${site.url}/learn/tools/${content.slug}`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
};

export default function Page() {
  return (
    <ToolPage content={content} structuredData={structuredData}>
      <TBillCalculator />
    </ToolPage>
  );
}
