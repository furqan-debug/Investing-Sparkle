'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';

import { whatsappLink } from '@/content/whatsapp';
import { cleanLead, validateLead, type Lead, type LeadErrors } from '@/lib/lead';
import { cn } from '@/lib/cn';

/**
 * Contact gate for the two tools whose full result is personalised: the risk
 * profile and the zakat sheet.
 *
 * The inputs themselves are never behind this. It sits where the final result
 * would render, so someone can do the whole calculation first and only decide
 * at the end whether the detailed output is worth their details.
 *
 * On submit it opens WhatsApp inside the click's own task, before any network
 * call. Browsers block pop-ups spawned after an await, and this way the result
 * hand-off never depends on the API being fast.
 */

type Props = {
  tool: 'risk-profile' | 'zakat';
  title: string;
  description: string;
  submitLabel: string;
  buildMessage: (lead: Lead) => string;
  onSubmit: (lead: Lead, meta: { link: string; autoOpened: boolean }) => void;
  onBack?: () => void;
  backLabel?: string;
};

const inputClass =
  'mt-1.5 w-full min-w-0 rounded-xl border border-line bg-[#030604] px-4 py-3 text-sm text-ink outline-none transition-all duration-200 placeholder:text-low focus:border-sparkle-400 focus:ring-2 focus:ring-sparkle-400/15';

export function LeadCapture({
  tool,
  title,
  description,
  submitLabel,
  buildMessage,
  onSubmit,
  onBack,
  backLabel = 'Back to my answers',
}: Props) {
  const [lead, setLead] = useState<Lead>({ name: '', whatsapp: '', email: '' });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const submitted = useRef(false);

  function update(field: keyof Lead, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;

    const found = validateLead(lead);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    submitted.current = true;

    const clean = cleanLead(lead);
    const message = buildMessage(clean);
    const link = whatsappLink(message);
    const company = String(new FormData(event.currentTarget).get('company') ?? '');

    // Opened straight from the submit handler: a window spawned after an await
    // is treated as a pop-up and blocked.
    let autoOpened = false;
    try {
      const win = window.open(link, '_blank');
      if (win) {
        autoOpened = true;
        win.opener = null;
      }
    } catch {
      autoOpened = false;
    }

    setSubmitting(true);

    // Fire and forget: the visitor's result must never wait on our inbox.
    // keepalive lets the request finish if WhatsApp takes the tab out of focus.
    void fetch('/api/tool-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, ...clean, result: message, company }),
      keepalive: true,
    }).catch(() => undefined);

    onSubmit(clean, { link, autoOpened });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-sparkle-400/20 bg-sparkle-400/[0.03] p-5 md:p-7"
    >
      <p className="mono-label text-sparkle-300">One last step</p>
      <h2 className="h3 mt-3">{title}</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${tool}-name`} className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id={`${tool}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={lead.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            className={cn(inputClass, errors.name && 'border-red-400/60')}
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-xs text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${tool}-whatsapp`} className="text-sm font-medium text-ink">
            WhatsApp number
          </label>
          <input
            id={`${tool}-whatsapp`}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={lead.whatsapp}
            onChange={(event) => update('whatsapp', event.target.value)}
            placeholder="0300 1234567"
            aria-invalid={Boolean(errors.whatsapp)}
            className={cn(inputClass, errors.whatsapp && 'border-red-400/60')}
          />
          {errors.whatsapp ? (
            <p role="alert" className="mt-1.5 text-xs text-red-300">
              {errors.whatsapp}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-muted">Local or international format both work.</p>
          )}
        </div>

        <div>
          <label htmlFor={`${tool}-email`} className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id={`${tool}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={lead.email}
            onChange={(event) => update('email', event.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(inputClass, errors.email && 'border-red-400/60')}
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-xs text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div className="hidden" aria-hidden>
          <label htmlFor={`${tool}-company`}>Company</label>
          <input id={`${tool}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn--primary btn--lg mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitLabel} <ArrowRight className="h-4 w-4" aria-hidden />
      </button>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        We open WhatsApp with your result ready to send. Nothing leaves your phone until you press
        send, and we only use these details to reply to this request.
      </p>

      <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden />
        We never ask for your CNIC, brokerage login, or account numbers.
      </p>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-xs font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
        >
          {backLabel}
        </button>
      )}

      <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        By continuing you agree to be contacted about this result. Read our{' '}
        <Link
          href="/privacy"
          className="text-green-300 underline decoration-green-300/30 underline-offset-2 hover:text-green-200"
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
