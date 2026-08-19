import { Calendar, Clock, Globe, Languages, Ticket, ArrowRight } from 'lucide-react';
import { bootcamp } from '@/content/bootcamp';
import { Button } from './ui/Button';
import { Newsletter } from './Newsletter';

/**
 * "Currently enrolling" card, shared by the Home page and the Learn hub.
 *
 * When no cohort is open, this flips to a waitlist state automatically — so a
 * closed cohort never leaves a dead "Reserve your seat" button on the site.
 */
export function BootcampCard() {
  if (bootcamp.status !== 'enrolling') {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 md:p-10">
        <p className="eyebrow text-green-600">Next cohort</p>
        <h3 className="h3 mt-3">Next bootcamp announcing soon</h3>
        <p className="mt-3 max-w-xl text-muted">
          Join the list and you will hear about the next cohort before it goes public — cohorts are
          small and the last one filled quickly.
        </p>
        <div className="mt-6">
          <Newsletter compact />
        </div>
      </div>
    );
  }

  const meta = [
    { icon: Calendar, label: bootcamp.dates },
    { icon: Clock, label: bootcamp.time },
    { icon: Globe, label: bootcamp.format },
    { icon: Languages, label: bootcamp.language },
    { icon: Ticket, label: bootcamp.price },
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-green-900 text-white">
      <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
        <div>
          <p className="eyebrow text-sparkle-400">Currently enrolling · 3-day bootcamp</p>
          <h3 className="h2 mt-3">{bootcamp.title}</h3>
          <p className="lede mt-3 text-green-100">{bootcamp.pitch}</p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-green-100">
            {meta.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
                {label}
              </li>
            ))}
            {/* Only rendered when the number is real — see content/bootcamp.ts. */}
            {bootcamp.seatsRemaining !== null && (
              <li className="flex items-center gap-2 font-semibold text-sparkle-400">
                {bootcamp.seatsRemaining} seats remaining
              </li>
            )}
          </ul>
        </div>

        <div className="md:text-right">
          <Button href="/learn/bootcamp" size="lg" className="w-full sm:w-auto">
            Reserve your seat <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-green-200">
            Full refund up to 3 days before the start date.
          </p>
        </div>
      </div>
    </div>
  );
}
