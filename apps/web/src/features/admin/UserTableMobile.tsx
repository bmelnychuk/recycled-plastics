'use client';

import { FC, ReactNode, useMemo, useState } from 'react';
import { User } from '@rp/core';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/design-system/components/ui/input-group';
import { Button } from '@/design-system/components/ui/button';
import { Search } from 'lucide-react';
import { Mail } from 'lucide-react';

const PAGE_SIZE = 15;

const UserMobileCard: FC<{ user: User }> = ({ user }) => {
  const displayName = `${user.firstName} ${user.lastName}`.trim() || '—';
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm flex flex-col gap-2">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-medium truncate">{displayName}</p>
        <a
          href={`mailto:${user.email}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline min-w-0"
        >
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{user.email}</span>
        </a>
      </div>
    </div>
  );
};

export const UserTableMobile: FC<{
  users: User[];
  callToAction: ReactNode | null;
}> = ({ users, callToAction }) => {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePageIndex = Math.min(pageIndex, pageCount - 1);
  const pageRows = useMemo(() => {
    const start = safePageIndex * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePageIndex]);

  const goPrev = () => setPageIndex((p) => Math.max(0, p - 1));
  const goNext = () => setPageIndex((p) => Math.min(pageCount - 1, p + 1));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-3 rounded-lg">
        <InputGroup className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors flex-1 min-w-0">
          <InputGroupInput
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
          />
          <InputGroupAddon className="text-muted-foreground">
            <Search />
          </InputGroupAddon>
        </InputGroup>
        {callToAction}
      </div>

      <div className="flex flex-col gap-3">
        {pageRows.length > 0 ? (
          pageRows.map((user) => <UserMobileCard key={user.id} user={user} />)
        ) : (
          <div className="rounded-lg border bg-muted/30 p-6 text-center text-muted-foreground">
            No results.
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center justify-center text-sm font-medium">
          Page {safePageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goPrev}
            disabled={safePageIndex <= 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={safePageIndex >= pageCount - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
