'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MessageThreadViewModel } from '@rp/core';
import { CompanyMessageThreadsList } from './CompanyMessageThreadsList';
import { ScrollArea } from '@/design-system/components/ui/scroll-area';

export function ThreadListPanel({
  threads,
  selectedThreadId,
  currentCompanyId,
}: {
  threads: MessageThreadViewModel[];
  selectedThreadId?: string;
  currentCompanyId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <ScrollArea className="h-full">
      <div className="shrink-0 px-4 py-3">
        <h2 className="text-sm font-semibold">Messages</h2>
      </div>
      <div className="pb-6">
      <CompanyMessageThreadsList
        threads={threads}
        selectedThreadId={selectedThreadId}
        onSelect={(threadId) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('thread', threadId);
          router.push(`/communication?${params.toString()}`);
        }}
        currentCompanyId={currentCompanyId}
      />
      </div>
    </ScrollArea>
  );
}
