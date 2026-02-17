import { cn } from '@/design-system/lib/utils';
import { MessageSquare, ShoppingCart, Package } from 'lucide-react';
import Link from 'next/link';

export type MessageThreadFilter = 'all' | 'demand' | 'supply';

const FILTERS: { id: MessageThreadFilter; label: string; icon: typeof MessageSquare }[] = [
  { id: 'all', label: 'All', icon: MessageSquare },
  { id: 'demand', label: 'Demand', icon: ShoppingCart },
  { id: 'supply', label: 'Supply', icon: Package },
];

interface MessageThreadsFilterProps {
  value: MessageThreadFilter;
}

export function MessageThreadsFilter({ value }: MessageThreadsFilterProps) {
  return (
    <nav
      className="flex flex-row gap-1 overflow-x-auto p-4 md:flex-col"
      role="group"
      aria-label="Message filters"
    >
      {FILTERS.map(({ id, label, icon: Icon }) => (
        <Link
          key={id}
          href={id === 'all' ? '/communication' : `/communication?filter=${id}`}
          aria-current={value === id ? 'page' : undefined}
          className={cn(
            'flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            value === id && 'bg-accent text-accent-foreground',
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
