import { ShieldCheck, BookOpen, Landmark, Handshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const signals = [
  { icon: Landmark, label: 'Founded', text: 'May 2025, Karachi' },
  { icon: BookOpen, label: 'Focus', text: 'Education, not tips' },
  { icon: ShieldCheck, label: 'Custody', text: 'We never touch your money' },
  { icon: Handshake, label: 'Pricing', text: 'Public, no hidden fees' },
];

export function TrustBar() {
  return (
    <div className="border-t border-line bg-white/[0.015]">
      <div className="container-page">
        <ScrollReveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-[12.5px] text-muted md:justify-between">
            {signals.map(({ icon: Icon, label, text }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0 text-sparkle-400" aria-hidden />
                <span className="mono-label text-[10.5px]">{label}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  );
}
