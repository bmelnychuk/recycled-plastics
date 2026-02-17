'use client';

import * as React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { XIcon, SendIcon, BuildingIcon, PackageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/design-system/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/design-system/components/ui/input-group';
import { Company, MaterialDemand, MaterialSupply, MessageViewModel } from '@rp/core';
import { createMessageThread } from '@/server';
import { MessageBubble } from '@/features/communication/MessageList';

type PortalConfig = {
  company: Company;
  supply?: MaterialSupply;
  demand?: MaterialDemand;
  messages?: MessageViewModel[];
  currentCompanyId?: string;
};

type PortalPanelContextValue = {
  open: (config: PortalConfig) => void;
  close: () => void;
};

const PortalPanelContext = createContext<PortalPanelContextValue | null>(null);

export function usePortalPanel() {
  const ctx = useContext(PortalPanelContext);
  if (!ctx)
    throw new Error('usePortalPanel must be used within PortalPanelProvider');
  return ctx;
}

export function PortalPanelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<PortalConfig | null>(null);

  const open = useCallback((c: PortalConfig) => setConfig(c), []);
  const close = useCallback(() => setConfig(null), []);

  return (
    <PortalPanelContext value={{ open, close }}>
      {children}
      {config && <PortalPanel config={config} onClose={close} />}
    </PortalPanelContext>
  );
}

function PortalPanel({
  config,
  onClose,
}: {
  config: PortalConfig;
  onClose: () => void;
}) {
  const { company, supply, demand, messages, currentCompanyId } = config;
  const topic = supply
    ? { type: 'supply' as const, companyId: supply.companyId, id: supply.id }
    : demand
      ? { type: 'demand' as const, companyId: demand.companyId, id: demand.id }
      : null;
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const send = async () => {
    if (!message.trim() || sending || !topic) return;
    const body = message.trim();
    setSending(true);
    try {
      const existingThreadId = messages?.[0]?.threadId;
      await createMessageThread({
        thread: existingThreadId
          ? { type: 'existing', id: existingThreadId }
          : {
              type: 'new',
              topic,
              to: { companyId: company.id },
            },
        body,
      });
      toast.success('Message sent');
      onClose();
      router.refresh();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-background fixed right-4 bottom-0 z-50 flex h-[600px] w-[500px] max-w-[500px] flex-col overflow-hidden rounded-t-lg border shadow-2xl">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between rounded-t-lg border-b px-4 py-3">
        <span className="text-sm font-semibold">Message to {company.name}</span>
        <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
          <XIcon className="size-3.5" />
        </Button>
      </div>

      {/* Preview */}
      {topic && (
        <div className="shrink-0 border-b px-4 py-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BuildingIcon className="text-muted-foreground size-4 shrink-0" />
              <span className="text-sm font-medium">{company.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageIcon className="text-muted-foreground size-4 shrink-0" />
              {supply ? (
                <>
                  <span className="text-sm">{supply.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {supply.material.type.toUpperCase()} · {supply.amount}t
                  </span>
                </>
              ) : demand ? (
                <span className="text-sm text-muted-foreground">
                  {demand.material.type.toUpperCase()} · {demand.amount}t
                  {demand.description ? ` · ${demand.description}` : ''}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Message History */}
      {messages && messages.length > 0 && (
        <div className="min-h-0 flex-1 overflow-auto border-b">
          <div className="flex w-full min-w-0 max-w-full flex-col gap-4 overflow-x-hidden p-4 box-border">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isOwn={!!currentCompanyId && msg.createdBy.companyId === currentCompanyId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Compose */}
      <div className="shrink-0 p-3">
        <InputGroup>
          <InputGroupTextarea
            placeholder={`Write your message to ${company.name}...`}
            rows={3}
            style={{ maxHeight: '7.5rem', overflowY: 'auto' }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              size="sm"
              className="ml-auto"
              onClick={send}
              disabled={!message.trim()}
              loading={sending}
            >
              <SendIcon className="size-4" />
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
