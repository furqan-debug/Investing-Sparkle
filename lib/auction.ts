import { extractText, getDocumentProxy } from 'unpdf';

import {
  pibFallback,
  tbillFallback,
  type PibBond,
  type PibSnapshot,
  type TbillSnapshot,
  type TbillYield,
} from '@/content/savings-rates';

/**
 * Reads the latest SBP auction result PDFs.
 *
 * SBP publishes a stable URL for each result file, so the file always holds
 * the most recent auction. The text is extracted server-side and the cut-off
 * yields are read with a narrow pattern. If the file moves, changes shape or
 * cannot be fetched, the tool falls back to a dated snapshot and says so.
 *
 * Nothing is inferred: a yield that is not printed in the PDF is not returned.
 */

const TBILL_URL = 'https://www.sbp.org.pk/assets/document/auction-tbills.pdf';
const PIB_URL = 'https://www.sbp.org.pk/assets/document/Auction-Investment.pdf';

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

async function readPdf(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(12000),
      headers: { accept: 'application/pdf' },
    });

    if (!response.ok) return null;

    const bytes = new Uint8Array(await response.arrayBuffer());
    const pdf = await getDocumentProxy(bytes);
    const { text } = await extractText(pdf, { mergePages: true });

    return text;
  } catch {
    return null;
  }
}

function parseTbills(text: string): TbillSnapshot | null {
  const pattern =
    /^(0[136]|12)-Month\s+[\d,.]+\s+[\d,.]+\s+([\d.]+)%\s+([\d.]+)%/gm;
  const yields: TbillYield[] = [];

  for (const match of text.matchAll(pattern)) {
    const months = Number(match[1]);
    const cutOff = Number((Number(match[2]) / 100).toFixed(6));
    if (Number.isFinite(months) && Number.isFinite(cutOff) && cutOff > 0) {
      if (!yields.some((entry) => entry.months === months)) {
        yields.push({ months, yield: cutOff });
      }
    }
  }

  if (yields.length < 4) return null;

  const dateMatch = text.match(/on ([A-Z][a-z]+) (\d{1,2}), (\d{4}) with settlement/);
  let asOf = tbillFallback.asOf;
  let display = 'latest auction';

  if (dateMatch) {
    const month = MONTHS[dateMatch[1].slice(0, 3).toLowerCase()];
    const day = Number(dateMatch[2]);
    const year = Number(dateMatch[3]);
    if (month !== undefined) {
      asOf = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      display = `${day} ${dateMatch[1]} ${year}`;
    }
  }

  return {
    asOf,
    source: `SBP auction result, ${display}`,
    live: true,
    yields: yields.sort((a, b) => a.months - b.months),
  };
}

function parsePibs(text: string, coupons: Record<number, number>): PibSnapshot | null {
  const pattern =
    /^(02|03|05|07|10|15)-Year\s+[\d,.-]+\s+[\d,.-]+\s+[\d,.-]+\s+[\d,.-]+\s+([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/gm;
  const bonds: PibBond[] = [];

  for (const match of text.matchAll(pattern)) {
    const years = Number(match[1]);
    const price = Number(match[2]);
    const cutOff = Number((Number(match[3]) / 100).toFixed(6));

    if (years >= 3 && Number.isFinite(price) && Number.isFinite(cutOff) && cutOff > 0) {
      if (!bonds.some((bond) => bond.years === years)) {
        bonds.push({ years, coupon: coupons[years] ?? 0, price, yield: cutOff });
      }
    }
  }

  if (bonds.length === 0) return null;

  const dateMatch = text.match(/held on (\d{2})-([A-Za-z]{3})-(\d{2})/);
  let asOf = pibFallback.asOf;
  let display = 'latest auction';
  if (dateMatch) {
    const day = Number(dateMatch[1]);
    const month = MONTHS[dateMatch[2].toLowerCase()];
    const year = 2000 + Number(dateMatch[3]);
    if (month !== undefined) {
      asOf = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      display = `${day} ${dateMatch[2]} ${year}`;
    }
  }

  return {
    asOf,
    source: `SBP PIB auction result, ${display}`,
    live: true,
    bonds: bonds.sort((a, b) => a.years - b.years),
  };
}

export type AuctionRates = {
  tbills: TbillSnapshot;
  pibs: PibSnapshot;
};

const coupons = Object.fromEntries(pibFallback.bonds.map((bond) => [bond.years, bond.coupon]));

export async function getAuctionRates(): Promise<AuctionRates> {
  const [tbillText, pibText] = await Promise.all([readPdf(TBILL_URL), readPdf(PIB_URL)]);

  const tbills = tbillText ? parseTbills(tbillText) : null;
  const pibs = pibText ? parsePibs(pibText, coupons) : null;

  return {
    tbills: tbills ?? tbillFallback,
    pibs: pibs ?? pibFallback,
  };
}
