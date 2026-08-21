import { ShieldCheck, BookOpen, Landmark, Handshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const signals = [
  { icon: Landmark, text: 'Founded May 2025, Karachi' },
  { icon: BookOpen, text: 'Education-first, not tips or trades' },
  { icon: ShieldCheck, text: 'We never touch your money' },
  { icon: Handshake, text: 'Public pricing, no hidden fees' },
];

export function TrustBar() {
  return (
    <div className="border-t-2 border-sparkle-400/60 bg-green-900">
      <div className="container-page">
        <ScrollReveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-sm text-green-100">
            {signals.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 shrink-0 text-sparkle-400" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  );
}
