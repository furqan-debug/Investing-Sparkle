import { formatPKR } from './format';
import type { Lead } from './lead';

/**
 * The message that leaves the site when a gated tool result is unlocked.
 *
 * It carries the full result, the visitor's details, and enough context that
 * the WhatsApp reply can pick up without asking the same questions again.
 * Written as plain text on purpose: WhatsApp strips most formatting.
 */

export type AllocationSlice = { label: string; percent: number };

export function riskBlueprintMessage(input: {
  lead: Lead;
  profile: string;
  score: number;
  maxScore: number;
  allocation: AllocationSlice[];
}): string {
  const { lead, profile, score, maxScore, allocation } = input;

  return [
    'Hi Investing Sparkle! Here is my risk profile result.',
    '',
    `Name: ${lead.name}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
    '',
    `Risk profile: ${profile}`,
    `Score: ${score} of ${maxScore}`,
    '',
    'Asset allocation blueprint:',
    ...allocation.map((slice) => `- ${slice.label}: ${slice.percent}%`),
    '',
    'Please review this and tell me the right next step.',
  ].join('\n');
}

export function zakatSheetMessage(input: {
  lead: Lead;
  assets: { label: string; value: number }[];
  liabilities: number;
  net: number;
  nisab: number;
  zakat: number;
  meetsNisab: boolean;
}): string {
  const { lead, assets, liabilities, net, nisab, zakat, meetsNisab } = input;

  const status = !nisab
    ? 'Nisab threshold not entered'
    : meetsNisab
      ? 'At or above nisab'
      : 'Below nisab, so no zakat is due';

  return [
    'Hi Investing Sparkle! Here is my zakat calculation.',
    '',
    `Name: ${lead.name}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
    '',
    assets.length > 0 ? 'Assets:' : 'Assets: none entered',
    ...assets.map((asset) => `- ${asset.label}: PKR ${formatPKR(asset.value)}`),
    '',
    `Total assets: PKR ${formatPKR(assets.reduce((sum, asset) => sum + asset.value, 0))}`,
    `Liabilities: PKR ${formatPKR(liabilities)}`,
    `Net zakatable wealth: PKR ${formatPKR(net)}`,
    `Nisab threshold: ${nisab ? `PKR ${formatPKR(nisab)}` : 'not entered'}`,
    `Status: ${status}`,
    `Zakat due at 2.5%: PKR ${formatPKR(meetsNisab ? zakat : 0)}`,
    '',
    'Please check my method and tell me if I have missed anything.',
  ].join('\n');
}
