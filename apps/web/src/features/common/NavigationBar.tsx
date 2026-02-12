'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/design-system/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/design-system/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import {
  CurrentUserNavigationItem,
  UserProfile,
} from '@/features/common/CurrentUserNavigationItem';
import { Button } from '@/design-system/components/ui/button';
import { Menu, Moon, Sparkles, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FC, useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { SignInButton } from '@/features/auth/SignInButton';
import { Badge } from '@/design-system/components/ui/badge';
import { SignedInUser } from '@rp/core';
import { usePathname } from 'next/navigation';
import { cn } from '@/design-system/lib/utils';

const SHOW_ANALYTICS = false;

interface Props {
  user?: SignedInUser;
}

function useUserProfile(): UserProfile | undefined {
  const clerk = useClerk();
  const primary = clerk.user?.primaryEmailAddress?.id;
  if (!clerk.user) return undefined;
  return {
    firstName: clerk.user.firstName ?? '',
    lastName: clerk.user.lastName ?? '',
    email:
      clerk.user.emailAddresses.find((e) => e.id === primary)?.emailAddress ??
      '',
  };
}

function useIsActive() {
  const pathname = usePathname();
  return (path: string) =>
    path === '/' ? pathname === '/' : pathname?.startsWith(path);
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="relative size-5">
        <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
    </Button>
  );
}

export const NavigationBar: FC<Props> = ({ user }) => {
  const userProfile = useUserProfile();
  const isActive = useIsActive();
  const isAdmin = user?.isAdmin;
  const offerUpgrade = false;

  return (
    <div className="px-4 flex flex-row h-16 items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              width={24}
              height={24}
              alt="Recycled Plastics"
            />
            <h1 className="text-xl font-bold">Recycled Plastics</h1>
          </div>
        </Link>
        <NavigationMenu className="z-1" viewport={false}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/supply') && 'bg-accent',
                )}
              >
                <Link href="/supply">Supply</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/demand') && 'bg-accent',
                )}
              >
                <Link href="/demand">Demand</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {SHOW_ANALYTICS && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/analytics') && 'bg-accent',
                  )}
                >
                  <Link href="/analytics">Analytics</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(isActive('/admin') && 'bg-accent')}
                >
                  Admin
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/companies">
                          <div className="text-sm leading-none font-medium">
                            Companies
                          </div>
                          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Browse all companies. Approve pending companies.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/materials">
                          <div className="text-sm leading-none font-medium">
                            Materials
                          </div>
                          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Approve pending supply and demand materials.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {!user ? (
          <SignInButton />
        ) : (
          <>
            {offerUpgrade && (
              <Button asChild>
                <Link href="/billing">
                  <Sparkles /> Upgrade to Pro
                </Link>
              </Button>
            )}
            {isAdmin && (
              <Badge className="bg-blue-500 text-white dark:bg-blue-600 text-xs sm:text-sm">
                Admin
              </Badge>
            )}
            <CurrentUserNavigationItem
              user={userProfile ?? { firstName: '', lastName: '', email: '' }}
              signedInUser={user}
            />
          </>
        )}
      </div>
    </div>
  );
};

const MOBILE_NAV_LINKS: { href: string; label: string; show?: boolean }[] = [
  { href: '/supply', label: 'Supply' },
  { href: '/demand', label: 'Demand' },
  { href: '/analytics', label: 'Analytics', show: SHOW_ANALYTICS },
];

const MOBILE_ADMIN_LINKS: { href: string; label: string }[] = [
  { href: '/admin/companies', label: 'Companies' },
  { href: '/admin/materials', label: 'Materials' },
];

export const NavigationBarMobile: FC<Props> = ({ user }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const userProfile = useUserProfile();
  const isActive = useIsActive();
  const isAdmin = user?.isAdmin;
  const linkClass = (path: string) =>
    cn(
      'block rounded-md px-3 py-2 text-base font-medium',
      isActive(path) ? 'bg-accent' : 'hover:bg-accent/50',
    );
  const closeSheet = () => setSheetOpen(false);

  return (
    <div className="flex h-16 flex-row items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 pt-4">
              {MOBILE_NAV_LINKS.filter((l) => l.show !== false).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href)}
                  onClick={closeSheet}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <>
                  <span className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Admin
                  </span>
                  {MOBILE_ADMIN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={linkClass(link.href)}
                      onClick={closeSheet}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/">
          <Image
            src="/icon.png"
            width={24}
            height={24}
            alt="Recycled Plastics"
          />
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <ThemeToggle />
        {!user ? (
          <SignInButton />
        ) : (
          <>
            {isAdmin && (
              <Badge className="bg-blue-500 text-white dark:bg-blue-600 text-xs">
                Admin
              </Badge>
            )}
            <CurrentUserNavigationItem
              user={userProfile ?? { firstName: '', lastName: '', email: '' }}
              signedInUser={user}
            />
          </>
        )}
      </div>
    </div>
  );
};
