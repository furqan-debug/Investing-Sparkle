/**
 * Live market data used by the tools.
 *
 * Two feeds are free and need no key: open.er-api.com for USD/PKR and
 * gold-api.com for spot gold and silver. Everything is fetched server-side and
 * cached for an hour, so a page load does not hammer either service.
 *
 * If a feed is down, the tool gets a clearly labelled reference snapshot rather
 * than a silent guess. The UI always shows the timestamp and whether the figure
 * is live. When the PSX, KIBOR and T-bill providers are connected, they follow
 * the same contract.
 */

const TROY_OUNCE_GRAMS = 31.1034768;
const TOLA_GRAMS = 11.6638;

export type MetalQuote = {
  goldPerGram: number;
  silverPerGram: number;
  goldPerTola: number;
  silverPerTola: number;
  goldUsdOz: number;
  silverUsdOz: number;
  usdPkr: number;
  asOf: string;
  source: string;
  live: boolean;
};

export type FxRates = {
  /** Units of each currency per 1 PKR. */
  rates: Record<string, number>;
  usdPkr: number;
  asOf: string;
  source: string;
  live: boolean;
};

/**
 * Snapshot captured on 12 November 2026. Only used when both live calls fail.
 * It is labelled as a reference figure, never as live.
 */
const REFERENCE = {
  goldUsdOz: 3873.5,
  silverUsdOz: 50.099,
  usdPkr: 276.931461,
  asOf: '2026-11-12T21:15:00Z',
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getMetalQuote(): Promise<MetalQuote> {
  const [fx, gold, silver] = await Promise.all([
    getJson<{ rates?: { PKR?: number }; time_last_update_utc?: string }>(
      'https://open.er-api.com/v6/latest/USD'
    ),
    getJson<{ price?: number; updatedAt?: string }>('https://api.gold-api.com/price/XAU'),
    getJson<{ price?: number; updatedAt?: string }>('https://api.gold-api.com/price/XAG'),
  ]);

  const usdPkr = fx?.rates?.PKR ?? REFERENCE.usdPkr;
  const goldUsdOz = gold?.price ?? REFERENCE.goldUsdOz;
  const silverUsdOz = silver?.price ?? REFERENCE.silverUsdOz;
  const live = Boolean(fx?.rates?.PKR && gold?.price && silver?.price);

  const goldPerGram = (goldUsdOz * usdPkr) / TROY_OUNCE_GRAMS;
  const silverPerGram = (silverUsdOz * usdPkr) / TROY_OUNCE_GRAMS;

  return {
    goldPerGram,
    silverPerGram,
    goldPerTola: goldPerGram * TOLA_GRAMS,
    silverPerTola: silverPerGram * TOLA_GRAMS,
    goldUsdOz,
    silverUsdOz,
    usdPkr,
    asOf: gold?.updatedAt ?? fx?.time_last_update_utc ?? REFERENCE.asOf,
    source: live ? 'gold-api.com and open.er-api.com' : 'Reference snapshot',
    live,
  };
}

export async function getFxRates(): Promise<FxRates> {
  const data = await getJson<{
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  }>('https://open.er-api.com/v6/latest/USD');

  const usdRates = data?.rates;
  const pkr = usdRates?.PKR;

  if (!usdRates || !pkr) {
    return {
      rates: { USD: 1 / REFERENCE.usdPkr, PKR: 1 },
      usdPkr: REFERENCE.usdPkr,
      asOf: REFERENCE.asOf,
      source: 'Reference snapshot',
      live: false,
    };
  }

  const rates: Record<string, number> = {};
  for (const [code, perUsd] of Object.entries(usdRates)) {
    if (typeof perUsd === 'number' && perUsd > 0) rates[code] = perUsd / pkr;
  }
  rates.PKR = 1;

  return {
    rates,
    usdPkr: pkr,
    asOf: data?.time_last_update_utc ?? new Date().toISOString(),
    source: 'open.er-api.com',
    live: true,
  };
}

export const metalConstants = { TROY_OUNCE_GRAMS, TOLA_GRAMS };
