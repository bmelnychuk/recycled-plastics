import { Package, Building2 } from 'lucide-react';
import { FC } from 'react';

export interface DemandHeroCompactProps {
  activeListings: number;
  buyers: number;
}

export const DemandHeroCompact: FC<DemandHeroCompactProps> = ({
  activeListings,
  buyers,
}) => {
  const stats = [
    { label: 'Active Listings', value: activeListings, icon: Package },
    { label: 'Buyers', value: buyers, icon: Building2 },
  ];

  return (
    <div className="rounded-lg border bg-linear-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Demand</h1>
          <p className="text-muted-foreground mt-1">
            Explore buying requests for recycled plastics from verified buyers
            worldwide
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm">
                <stat.icon className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
