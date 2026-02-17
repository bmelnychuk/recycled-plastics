import { cn } from '@/design-system/lib/utils';
import { Company, MessageThreadViewModel } from '@rp/core';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquareIcon } from 'lucide-react';
import { FC } from 'react';
import { SideBatch } from '../material/MaterialSideBatch';

interface CompanyMessageThreadsListProps {
  threads: MessageThreadViewModel[];
  currentCompanyId: string;
  selectedThreadId?: string;
  onSelect: (threadId: string) => void;
}

const getOtherCompany = (
  thread: MessageThreadViewModel,
  currentCompanyId: string,
): Company => {
  return thread.from.companyId === currentCompanyId
    ? thread.to.company
    : thread.from.company;
};

export const CompanyMessageThreadsList: FC<CompanyMessageThreadsListProps> = ({
  threads,
  onSelect,
  currentCompanyId,
  selectedThreadId,
}) => {
  if (threads.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6">
        <MessageSquareIcon className="text-muted-foreground size-8" />
        <p className="text-muted-foreground text-sm">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {threads.map((thread, index) => {
        const otherCompany = getOtherCompany(thread, currentCompanyId);
        const isSelected = thread.id === selectedThreadId;

        return (
          <button
            key={thread.id}
            onClick={() => onSelect(thread.id)}
            className={cn(
              'flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent',
              isSelected && 'bg-accent',
              index !== threads.length - 1 && 'border-b',
            )}
          >
            <div className="min-w-0 flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 truncate text-sm">
                {otherCompany.name}
              </div>
              <div className="text-muted-foreground line-clamp-3 text-xs">
                {thread.lastMessage.body}
              </div>
              <div className="flex items-center justify-between mt-1">
                <SideBatch side={thread.topic.type} />
                <span className="text-muted-foreground shrink-0 text-xs">
                  {formatDistanceToNow(thread.updatedDate, { addSuffix: true })}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
