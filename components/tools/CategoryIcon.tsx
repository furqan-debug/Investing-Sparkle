import {
  Banknote,
  ChartCandlestick,
  Coins,
  Gem,
  House,
  Landmark,
  Scale,
  Target,
  TrendingUp,
} from 'lucide-react';

const icons = {
  Landmark,
  ChartCandlestick,
  TrendingUp,
  Coins,
  Scale,
  Banknote,
  Target,
  House,
  Gem,
} as const;

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Landmark;
  return <Icon className={className} aria-hidden />;
}
