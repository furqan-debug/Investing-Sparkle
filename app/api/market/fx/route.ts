import { NextResponse } from 'next/server';

import { getFxRates } from '@/lib/market';

/** Current exchange rates with PKR as the base. */
export async function GET() {
  const rates = await getFxRates();

  return NextResponse.json(rates, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
