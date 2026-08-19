import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { CookieBanner } from '@/components/CookieBanner';
import { Analytics } from '@/components/Analytics';
import { site } from '@/content/site';

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display-loaded',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Learn to invest in Pakistan`,
    // Every page sets its own title; this appends the brand consistently.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'PSX',
    'Pakistan Stock Exchange',
    'how to invest in PSX',
    'stock market course Pakistan',
    'financial literacy Pakistan',
    'Shariah compliant investing',
    'KSE-100',
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Learn to invest in Pakistan`,
    description: site.description,
    // The share image is generated at build time by app/opengraph-image.tsx.
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Learn to invest in Pakistan`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#04241a',
  width: 'device-width',
  initialScale: 1,
};

/** Organization schema — emitted once, site-wide. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  description: site.description,
  foundingDate: '2025-05',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressCountry: 'PK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.contact.whatsapp,
    contactType: 'customer service',
    email: site.contact.email,
    areaServed: 'PK',
    availableLanguage: ['Urdu', 'English'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${display.variable} ${sans.variable}`}>
      <body>
        {/* Keyboard users land here first — the plan's accessibility baseline. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sparkle-400 focus:px-5 focus:py-2.5 focus:font-semibold focus:text-green-950"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        <WhatsAppFloat />
        <CookieBanner />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
