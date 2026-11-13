import { NextResponse } from 'next/server';

import { getAuctionRates } from '@/lib/auction';

/**
 * Latest SBP Treasury bill and PIB auction results, read from the official
 * result PDFs. Cached for an hour at the CDN and in the data layer; the SBP
 * files themselves are cached for an hour as well.
 */

export const revalidate = 3600;

export async function GET() {
  const rates = await getAuctionRates();

  return NextResponse.json(rates, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
