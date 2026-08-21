'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

/**
 * Contact form.
 *
 * TODO — connect app/api/contact/route.ts to something that actually delivers
 * (Resend, Postmark, SendGrid, or a Formspree-style endpoint). Until then this
 * posts to a route that logs and returns success in development, and the
 * pre-launch checklist item "contact form submissions delivered to inbox"
 * stays unticked.
 */

const interests = [
  'Course',
  'Bootcamp',
  'Advisory',
  'Partnership',
  'Media',
  'Other',
] as const;

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-6 animate-scale-in">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
        <div>
          <p className="font-semibold text-ink">Message received.</p>
          <p className="mt-1 text-sm text-muted">
            We reply within a few hours on business days. If it is urgent, WhatsApp is faster.
          </p>
        </div>
      </div>
    );
  }

  const fieldClass =
    'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-green-600 focus:ring-2 focus:ring-green-500/20';

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name <span className="text-danger">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="text-sm font-medium text-ink">
            WhatsApp <span className="text-muted">(optional)</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+92 3XX XXXXXXX"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="interest" className="text-sm font-medium text-ink">
            What is this about?
          </label>
          <select id="interest" name="interest" defaultValue="Course" className={fieldClass}>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message <span className="text-danger">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} className={fieldClass} />
      </div>

      {state === 'error' && (
        <p className="text-sm text-danger">
          That didn’t send. Please try again, or message us on WhatsApp. It is faster anyway.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-liquid btn-liquid--primary justify-self-start rounded-full bg-sparkle-400 px-7 py-3 font-semibold text-green-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-60"
      >
        {state === 'loading' ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-xs leading-relaxed text-muted">
        We use your details only to reply to this message. We do not sell or share them. See our{' '}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
