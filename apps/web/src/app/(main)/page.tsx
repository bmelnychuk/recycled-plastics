import { RecentMaterials } from '@/composite/dashboard/RecentMaterials';
import { application } from '@/core';
import { DemandHeroCompact } from '@/features/demand/DemandHeroCompact';
import { SupplyHeroCompact } from '@/features/supply/SupplyHeroCompact';

export default async function Page() {
  const [demand, supply, user] = await Promise.all([
    application.getActiveDemand(),
    application.getActiveSupply(),
    application.getCurrentUser(),
  ]);

  const suppliers = new Set(supply.map((material) => material.companyId));
  const buyers = new Set(demand.map((material) => material.companyId));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SupplyHeroCompact
          activeListings={supply.length}
          suppliers={suppliers.size}
        />
        <DemandHeroCompact
          activeListings={demand.length}
          buyers={buyers.size}
        />
      </div>
      <RecentMaterials user={user} demand={demand} supply={supply} />
    </div>
  );
}
