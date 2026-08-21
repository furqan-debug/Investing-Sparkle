import { Quote } from 'lucide-react';
import type { Testimonial } from '@/content/bootcamp';

export function Testimonials({
  items,
  emptyMessage,
}: {
  items: Testimonial[];
  emptyMessage?: string;
}) {
  if (items.length === 0) {
    if (!emptyMessage) return null;
    return (
      <p className="rounded-2xl border border-dashed border-line bg-white px-6 py-8 text-center text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((t) => (
        <li key={t.name} className="card flex flex-col p-6">
          <Quote className="h-5 w-5 text-sparkle-400/60" aria-hidden />
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            {t.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-green-50 font-display text-lg text-green-800"
                aria-hidden
              >
                {t.name.charAt(0)}
              </span>
            )}
            <span className="text-sm">
              <span className="block font-semibold text-ink">{t.name}</span>
              <span className="block text-xs text-muted">{t.credential}</span>
            </span>
          </figcaption>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted">{t.source}</p>
        </li>
      ))}
    </ul>
  );
}
