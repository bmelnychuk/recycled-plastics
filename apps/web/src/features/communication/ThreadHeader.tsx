'use client';

import { Company, MaterialSupply, MaterialDemand } from '@rp/core';
import { CompanySheetButton } from '@/features/company/CompanySheetButton';
import { SupplySheetButton } from '@/features/supply/SupplySheetButton';
import { DemandSheetButton } from '@/features/demand/DemandSheetButton';
import { SideBatch } from '@/features/material/MaterialSideBatch';
import { ColorPreview } from '@/features/material/MaterialColor';
import { PriceValue } from '@/features/common/PriceValue';

export function ThreadHeader({
  company,
  material,
  topicType,
}: {
  company: Company;
  material: MaterialSupply | MaterialDemand;
  topicType: 'supply' | 'demand';
}) {
  return (
    <div className="border-b px-4 py-2.5 shrink-0 flex flex-col gap-3 text-sm items-start">
      <CompanySheetButton company={company} />
      <div className="flex items-center gap-3">
        <SideBatch side={topicType} />
        {topicType === 'supply' ? (
          <SupplySheetButton supply={material as MaterialSupply} />
        ) : (
          <DemandSheetButton demand={material as MaterialDemand} />
        )}
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <ColorPreview color={material.material.color} />
        </span>
        <span className="text-muted-foreground">
          {material.amount.toLocaleString()} t
        </span>
        <span className="text-muted-foreground">
          <PriceValue price={material.price} />
        </span>
      </div>
    </div>
  );
}
