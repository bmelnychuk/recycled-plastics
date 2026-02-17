'use client';

import { MessageSquareIcon } from 'lucide-react';
import { Button } from '@/design-system/components/ui/button';
import { usePortalPanel } from './PortalPanel';
import { Company, MaterialDemand, MaterialSupply, MessageViewModel, SignedInUser } from '@rp/core';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/design-system/components/ui/tooltip';

export function SendNewMessageButton({
  company,
  supply,
  demand,
  messages,
  user
}: {
  company: Company;
  supply?: MaterialSupply;
  demand?: MaterialDemand;
  messages?: MessageViewModel[];
  user?: SignedInUser;
}) {
  const { open } = usePortalPanel();
  const hasTopic = supply ?? demand;

  const canSend = (user?.isCompanyVerified && user?.companyId) || user?.isAdmin;

  // disabled button with the tooltip to verify company
  if (!canSend) return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button
            size="icon"
            className="shrink-0 md:h-9 md:w-auto md:px-4 md:py-2"
            disabled
            aria-label="New material"
          >
            <MessageSquareIcon className="size-4" />
            Send Message
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Your company needs to be verified to send messages</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <Button
      onClick={() =>
        hasTopic &&
        open({ company, supply, demand, messages, currentCompanyId: user?.companyId })
      }
      disabled={!hasTopic}
    >
      <MessageSquareIcon className="size-4" />
      Send Message
    </Button>
  );
}
