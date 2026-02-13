'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/design-system/lib/utils';
import { User, CreditCardIcon, LucideIcon, Building2 } from 'lucide-react';

export function SettingsNavigation() {
  return (
    <nav className="flex flex-row gap-1 overflow-x-auto p-4 md:flex-col">
      <NavLink href="/settings/company" icon={Building2}>
        Company
      </NavLink>
      {/* <NavLink href="/billing" icon={CreditCardIcon}>
        Billing
      </NavLink> */}
    </nav>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isActive && 'bg-accent text-accent-foreground',
      )}
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
}
