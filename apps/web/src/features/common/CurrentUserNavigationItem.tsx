'use client';

import { Avatar, AvatarFallback } from '@/design-system/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

import Link from 'next/link';

import { FC, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/design-system/components/ui/popover';
import { Button } from '@/design-system/components/ui/button';
import { Separator } from '@/design-system/components/ui/separator';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface Props {
  user: UserProfile;
}

export const CurrentUserNavigationItem: FC<Props> = ({ user }) => {
  const clerk = useClerk();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  if (!user) return null;
  const initial = user.firstName?.charAt(0).toUpperCase() || '~';

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer border border-black">
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-black">
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              asChild
              onClick={() => setIsPopoverOpen(false)}
            >
              <Link href="/settings">
                <Settings /> Settings
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => {
                setIsPopoverOpen(false);
                clerk.openUserProfile();
              }}
            >
              <User /> Profile
            </Button>

            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => {
                setIsPopoverOpen(false);
                clerk.signOut();
              }}
            >
              <LogOut /> Sign out
            </Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <a
              href="/legal/terms"
              className="hover:text-foreground transition-colors"
              onClick={() => setIsPopoverOpen(false)}
            >
              Terms
            </a>
            <span>·</span>
            <a
              href="/legal/privacy"
              className="hover:text-foreground transition-colors"
              onClick={() => setIsPopoverOpen(false)}
            >
              Privacy
            </a>
            <span>·</span>
            <a
              href="/legal/imprint"
              className="hover:text-foreground transition-colors"
              onClick={() => setIsPopoverOpen(false)}
            >
              Imprint
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
