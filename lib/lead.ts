/**
 * Lead capture for the gated tool results.
 *
 * Two tools (the risk profile and the zakat calculator) ask for contact
 * details before showing the final result. The same rules apply on the client
 * and in the API route, so the validation lives here rather than being written
 * twice and drifting apart.
 */

export type Lead = {
  name: string;
  whatsapp: string;
  email: string;
};

export type LeadField = keyof Lead;
export type LeadErrors = Partial<Record<LeadField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Digits only, with the Pakistani country code applied when someone types a
 * local 03xx number. Returns null when the result cannot be a real number.
 */
export function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/[^\d]/g, '');

  if (!digits) return null;
  if (digits.startsWith('00')) digits = digits.slice(2);

  if (digits.startsWith('0') && digits.length === 11) {
    digits = `92${digits.slice(1)}`;
  } else if (digits.length === 10 && digits.startsWith('3')) {
    digits = `92${digits}`;
  }

  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

/** `923181300262` becomes `+92 318 1300262`. */
export function formatPhone(digits: string): string {
  const local = digits.startsWith('92') && digits.length === 12 ? digits.slice(2) : null;
  if (!local) return `+${digits}`;
  return `+92 ${local.slice(0, 3)} ${local.slice(3)}`;
}

export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};

  if (lead.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  } else if (lead.name.trim().length > 120) {
    errors.name = 'That name is too long.';
  }

  if (!normalizePhone(lead.whatsapp)) {
    errors.whatsapp = 'Enter a valid WhatsApp number, for example 0300 1234567.';
  }

  if (!EMAIL_RE.test(lead.email.trim())) {
    errors.email = 'Enter a valid email address.';
  } else if (lead.email.trim().length > 200) {
    errors.email = 'That email address is too long.';
  }

  return errors;
}

/** The clean version that gets stored and sent. */
export function cleanLead(lead: Lead): Lead {
  const digits = normalizePhone(lead.whatsapp);

  return {
    name: lead.name.trim(),
    whatsapp: digits ? formatPhone(digits) : lead.whatsapp.trim(),
    email: lead.email.trim().toLowerCase(),
  };
}
