import {
  getCompanyMessageThreads,
  getMessagesByThreadId,
  getCompanyById,
  getSupplyById,
  getDemandById,
  getCurrentUser,
} from '@/server';
import { redirect } from 'next/navigation';
import { Company, MaterialSupply, MaterialDemand } from '@rp/core';
import { ThreadListPanel } from '@/features/communication/ThreadListPanel';
import { MessageList } from '@/features/communication/MessageList';
import { ThreadHeader } from '@/features/communication/ThreadHeader';
import { MessageThreadsFilter } from '@/features/communication/MessageThreadsFilter';

const VALID_FILTERS = ['all', 'demand', 'supply'] as const;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ thread?: string; filter?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user?.companyId) redirect('/');

  const { thread: threadId, filter } = await searchParams;
  const currentFilter = VALID_FILTERS.includes(filter as (typeof VALID_FILTERS)[number])
    ? (filter as 'all' | 'demand' | 'supply')
    : 'all';

  const allThreads = await getCompanyMessageThreads();
  const threads =
    currentFilter === 'all'
      ? allThreads
      : allThreads.filter((t) => t.topic.type === currentFilter);

  // Auto-select first thread if none specified
  const effectiveThreadId = threadId ?? threads[0]?.id;

  const selectedThread = effectiveThreadId
    ? threads.find((t) => t.id === effectiveThreadId)
    : undefined;

  let messages = undefined;
  let otherCompany: Company | null = null;
  let material: MaterialSupply | MaterialDemand | null = null;

  if (selectedThread) {
    const otherCompanyId =
      selectedThread.from.companyId === user.companyId
        ? selectedThread.to.companyId
        : selectedThread.from.companyId;

    const topic = selectedThread.topic;

    const [msgs, company, mat] = await Promise.all([
      getMessagesByThreadId({ threadId: selectedThread.id }),
      getCompanyById(otherCompanyId),
      topic.type === 'supply'
        ? getSupplyById(topic.companyId, topic.id).then(
          (s) => s as MaterialSupply,
        )
        : getDemandById(topic.companyId, topic.id).then(
          (d) => d as MaterialDemand,
        ),
    ]);

    messages = msgs;
    otherCompany = company;
    material = mat;
  }

  if (allThreads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-20 min-h-[calc(100vh-10rem)]">
        <p className="text-muted-foreground text-lg">No conversations yet</p>
        <p className="text-muted-foreground text-sm">
          Start by reaching out to a company from a supply or demand listing.
        </p>
      </div>
    );
  }


  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col md:flex-row">
      <aside className="border-b md:w-64 md:border-b-0 md:border-r shrink-0">
        <MessageThreadsFilter value={currentFilter} />
      </aside>

      <div className="flex-1 grid grid-cols-12 gap-0 min-h-0 overflow-hidden">
        <div className="col-span-3 border-r overflow-hidden flex flex-col min-h-0">
          <ThreadListPanel
            threads={threads}
            selectedThreadId={selectedThread?.id}
            currentCompanyId={user.companyId}
          />

        </div>
        <div className="col-span-9 min-h-0 overflow-hidden flex flex-col">
          {selectedThread && messages ? (
            <>
              {otherCompany && material && (
                <ThreadHeader
                  company={otherCompany}
                  material={material}
                  topicType={selectedThread.topic.type}
                />
              )}
              <MessageList
                threadId={selectedThread.id}
                messages={messages}
                currentCompanyId={user.companyId}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center h-full">
              <p className="text-muted-foreground text-sm">
                Select a conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
