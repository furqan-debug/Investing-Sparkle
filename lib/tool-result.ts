import { formatPKR } from './format';
import type { SessionUser } from './auth';

/**
 * The message that leaves the site when a tool result is handed to WhatsApp.
 *
 * It carries the full result, the signed-in visitor's name and email, and
 * enough context that the WhatsApp reply can pick up without asking the same
 * questions again. Written as plain text on purpose: WhatsApp strips most
 * formatting.
 *
 * There is no phone number in the body: the message is sent from the visitor's
 * own WhatsApp, so their number arrives with it.
 */

export type AllocationSlice = { label: string; percent: number };

type Identity = Pick<SessionUser, 'name' | 'email'>;

export function riskBlueprintMessage(input: {
  user: Identity;
  profile: string;
  score: number;
  maxScore: number;
  allocation: AllocationSlice[];
}): string {
  const { user, profile, score, maxScore, allocation } = input;

  return [
    'Hi Investing Sparkle! Here is my risk profile result.',
    '',
    `Name: ${user.name}`,
    `Email: ${user.email}`,
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
  user: Identity;
  assets: { label: string; value: number }[];
  liabilities: number;
  net: number;
  nisab: number;
  zakat: number;
  meetsNisab: boolean;
}): string {
  const { user, assets, liabilities, net, nisab, zakat, meetsNisab } = input;

  const status = !nisab
    ? 'Nisab threshold not entered'
    : meetsNisab
      ? 'At or above nisab'
      : 'Below nisab, so no zakat is due';

  return [
    'Hi Investing Sparkle! Here is my zakat calculation.',
    '',
    `Name: ${user.name}`,
    `Email: ${user.email}`,
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
