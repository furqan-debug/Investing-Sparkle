import type { Metadata } from 'next';

import { ToolPage } from '@/components/tools/ToolPage';
import { BankDepositCalculator } from '@/components/tools/BankDepositCalculator';
import { toolPages } from '@/content/tool-pages';
import { site } from '@/content/site';

const content = toolPages['bank-term-deposit-calculator'];

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
      <BankDepositCalculator />
    </ToolPage>
  );
}
