import { Package, Globe, TrendingUp, Building2 } from 'lucide-react';
import { FC } from 'react';

export interface SupplyHeroProps {
  activeListings: number;
  countries: number;
  thisWeek: number;
  suppliers: number;
}

export const SupplyHero: FC<SupplyHeroProps> = ({
  activeListings,
  countries,
  thisWeek,
  suppliers,
}) => {
  const stats = [
    { label: 'Active Listings', value: activeListings, icon: Package },
    { label: 'Countries', value: countries, icon: Globe },
    { label: 'Last Week', value: thisWeek, icon: TrendingUp },
    { label: 'Suppliers', value: suppliers, icon: Building2 },
  ];

  return (
    <div className="rounded-lg border bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supply</h1>
          <p className="text-muted-foreground mt-1">
            Browse available recycled plastics from verified suppliers worldwide
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm">
                <stat.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
