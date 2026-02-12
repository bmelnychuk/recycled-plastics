import { Package, Globe, TrendingUp, Building2 } from 'lucide-react';
import { FC } from 'react';

export interface DemandHeroProps {
  activeListings: number;
  countries: number;
  thisWeek: number;
  buyers: number;
}

export const DemandHero: FC<DemandHeroProps> = ({
  activeListings,
  countries,
  thisWeek,
  buyers,
}) => {
  const stats = [
    { label: 'Active Listings', value: activeListings, icon: Package },
    { label: 'Countries', value: countries, icon: Globe },
    { label: 'Last Week', value: thisWeek, icon: TrendingUp },
    { label: 'Buyers', value: buyers, icon: Building2 },
  ];

  return (
    <div className="rounded-lg border bg-linear-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Demand
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Explore buying requests for recycled plastics from verified buyers
            worldwide
          </p>
        </div>
        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm">
                <stat.icon className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: flex row with wrap */}
        <div className="hidden sm:flex flex-wrap gap-6">
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
