'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageViewModel } from '@rp/core';
import { createMessageThread } from '@/server';
import { format } from 'date-fns';
import { SendIcon } from 'lucide-react';
import { ScrollArea } from '@/design-system/components/ui/scroll-area';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/design-system/components/ui/input-group';
import { cn } from '@/design-system/lib/utils';

export function MessageBubble({
  message,
  isOwn,
}: {
  message: MessageViewModel;
  isOwn: boolean;
}) {
  const userName = message.createdBy.user
    ? `${message.createdBy.user.firstName} ${message.createdBy.user.lastName}`
    : 'Unknown';

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-1',
        isOwn ? 'items-end' : 'items-start',
      )}
    >
      <span className="text-muted-foreground shrink-0 px-1 text-xs">{userName}</span>
      <div
        className={cn(
          'min-w-0 max-w-[min(75%,22rem)] overflow-hidden rounded-lg px-3 py-2 text-sm whitespace-pre-wrap wrap-anywhere',
          isOwn
            ? 'bg-[var(--sky-4)] text-[var(--sky-11)]'
            : 'bg-[var(--slate-3)] text-[var(--slate-12)]',
        )}
      >
        {message.body}
      </div>
      <span className="text-muted-foreground shrink-0 px-1 text-xs">
        {format(message.createdDate, 'MMM d, HH:mm')}
      </span>
    </div>
  );
}

function ReplyForm({
  threadId,
  onSent,
}: {
  threadId: string;
  onSent: (body: string) => void;
}) {
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!replyText.trim() || sending) return;
    const body = replyText.trim();
    setSending(true);
    try {
      await createMessageThread({
        thread: { type: 'existing', id: threadId },
        body,
      });
      onSent(body);
      setReplyText('');
      router.refresh();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-3">
      <InputGroup>
        <InputGroupTextarea
          placeholder="Write a reply..."
          rows={2}
          style={{ maxHeight: '7.5rem', overflowY: 'auto' }}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="default"
            size="sm"
            className="ml-auto"
            onClick={handleSend}
            disabled={!replyText.trim() || sending}
            loading={sending}
          >
            <SendIcon className="size-4" />
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function MessageList({
  threadId,
  messages,
  currentCompanyId,
}: {
  threadId: string;
  messages: MessageViewModel[];
  currentCompanyId: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<string[]>([]);

  useEffect(() => {
    setOptimisticMessages([]);
    const viewport = scrollRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]',
    );
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight });
    }
  }, [threadId, messages]);

  const handleSent = (body: string) => {
    setOptimisticMessages((prev) => [...prev, body]);
    requestAnimationFrame(() => {
      const viewport = scrollRef.current?.querySelector(
        '[data-slot="scroll-area-viewport"]',
      );
      viewport?.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ScrollArea ref={scrollRef} className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.createdBy.companyId === currentCompanyId}
            />
          ))}
          {optimisticMessages.map((body, i) => (
            <div key={`optimistic-${i}`} className="flex flex-col items-end gap-1">
              <div className="bg-[var(--sky-4)] text-[var(--sky-11)] max-w-[75%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap">
                {body}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ReplyForm threadId={threadId} onSent={handleSent} />
    </div>
  );
}
