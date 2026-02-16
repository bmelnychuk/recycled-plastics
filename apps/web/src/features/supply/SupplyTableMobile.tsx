'use client';

import { FC, ReactNode, useMemo, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { ImageZoom } from '@/design-system/components/ui/shadcn-io/image-zoom';
import { cn } from '@/design-system/lib/utils';
import { SupplyViewModel } from '@rp/core';
import { SupplySheetButton } from '@/features/supply/SupplySheetButton';
import { ColorLabel, ColorPreview } from '@/features/material/MaterialColor';
import { CompanySheetButton } from '@/features/company/CompanySheetButton';
import { PriceValue } from '@/features/common/PriceValue';
import { formatDate } from '@/composite/common/date-utils';
import { generateBlurredName } from '@/lib/random';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/design-system/components/ui/input-group';
import { Button } from '@/design-system/components/ui/button';
import { Search } from 'lucide-react';

const PAGE_SIZE = 15;

const SupplyMobileCard: FC<{
  supply: SupplyViewModel;
  hideCompany?: boolean;
}> = ({ supply, hideCompany }) => {
  const image = supply.pictures?.[0]?.url;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm flex flex-col gap-2"
    >
      <div className="flex gap-3 min-w-0">
        {image ? (
          <div onClick={(e) => e.stopPropagation()}>
            <ImageZoom
              backdropClassName={cn(
                '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80',
              )}
            >
              <div className="aspect-square w-16 shrink-0 overflow-hidden rounded p-1">
                <img
                  src={image}
                  alt={supply.material.type}
                  className="h-full w-full cursor-zoom-in rounded object-cover object-center"
                />
              </div>
            </ImageZoom>
          </div>
        ) : (
          <div className="aspect-square w-16 shrink-0 rounded bg-muted" />
        )}
        <div className="min-w-0 flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <SupplySheetButton supply={supply} />
            <ColorPreview color={supply.material.color} />
            <ColorLabel color={supply.material.color} />
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(supply.updatedDate)} · {supply.amount} t
          </p>
        </div>
      </div>
      {supply.description ? (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {supply.description}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <PriceValue price={supply.price} />
        <div className="flex items-center gap-2">
          {!hideCompany &&
            (supply.company ? (
              <CompanySheetButton company={supply.company} />
            ) : (
              <span className="blur-[5px] text-sm">
                {generateBlurredName(supply.id)}
              </span>
            ))}
          {supply.location.country ? (
            <CircleFlag
              countryCode={supply.location.country.toLowerCase()}
              height="20"
              width="20"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const SupplyTableMobile: FC<{
  supply: SupplyViewModel[];
  callToAction: ReactNode;
  hideCompany?: boolean;
}> = ({ supply, callToAction, hideCompany }) => {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return supply;
    return supply.filter(
      (s) =>
        s.description?.toLowerCase().includes(q) ||
        s.material.type.toLowerCase().includes(q) ||
        s.material.color.toLowerCase().includes(q) ||
        s.location.country?.toLowerCase().includes(q),
    );
  }, [supply, search]);

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
            <SupplyMobileCard
              key={item.id}
              supply={item}
              hideCompany={hideCompany}
            />
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
