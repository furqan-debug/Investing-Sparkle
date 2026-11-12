import { NextResponse } from 'next/server';

import { getMetalQuote } from '@/lib/market';

/**
 * Gold and silver in PKR, derived from spot USD and the USD/PKR rate.
 * Cached for an hour at the CDN and in the data layer.
 */
export async function GET() {
  const quote = await getMetalQuote();

  return NextResponse.json(quote, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
