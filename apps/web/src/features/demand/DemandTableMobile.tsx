'use client';

import { FC, ReactNode, useMemo, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { DemandViewModel } from '@rp/core';
import { DemandSheetButton } from '@/features/demand/DemandSheetButton';
import { ColorLabel, ColorPreview } from '@/features/material/MaterialColor';
import { CompanySheetButton } from '@/features/company/CompanySheetButton';
import { formatDate } from '@/composite/common/date-utils';
import { formatPrice } from '@/composite/common/price-utils';
import { generateBlurredName } from '@/lib/random';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/design-system/components/ui/input-group';
import { Button } from '@/design-system/components/ui/button';
import { Search } from 'lucide-react';

const PAGE_SIZE = 15;

const DemandMobileCard: FC<{ demand: DemandViewModel }> = ({ demand }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm flex flex-col gap-2"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <DemandSheetButton demand={demand} />
          <ColorPreview color={demand.material.color} />
          <ColorLabel color={demand.material.color} />
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDate(demand.updatedDate)} · {demand.amount} t
        </p>
      </div>
      {demand.description ? (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {demand.description}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-medium">{formatPrice(demand.price)}</span>
        <div className="flex items-center gap-2">
          {demand.company ? (
            <CompanySheetButton company={demand.company} />
          ) : (
            <span className="blur-[5px] text-sm">
              {generateBlurredName(demand.id)}
            </span>
          )}
          {demand.location.country ? (
            <CircleFlag
              countryCode={demand.location.country.toLowerCase()}
              height="20"
              width="20"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const DemandTableMobile: FC<{
  demand: DemandViewModel[];
  callToAction: ReactNode | null;
}> = ({ demand, callToAction }) => {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return demand;
    return demand.filter(
      (d) =>
        d.description?.toLowerCase().includes(q) ||
        d.material.type.toLowerCase().includes(q) ||
        d.material.color.toLowerCase().includes(q) ||
        d.location.country?.toLowerCase().includes(q),
    );
  }, [demand, search]);

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
          pageRows.map((item) => (
            <DemandMobileCard key={item.id} demand={item} />
          ))
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
