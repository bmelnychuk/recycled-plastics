import { getCurrentUser, getActiveDemand } from '@/core';
import { DemandHero } from '@/features/demand/DemandHero';
import { ActiveDemandTable } from '@/features/demand/DemandTable';
import { isAfter, subDays } from 'date-fns';

export const generateMetadata = () => ({
  title: 'Materials | Recycled Plastics',
  description:
    'Browse a list of materials including PET, HDPE, LDPE, PP, PS, ABS, PC, PA, PE and more. See descriptions, colors, countries and prices.',
});

export default async function Page() {
  const [user, demandMaterials] = await Promise.all([
    getCurrentUser(),
    getActiveDemand(),
  ]);

  const startDate = subDays(new Date(), 7);

  const countries = new Set(demandMaterials.map((m) => m.location.country));
  const activeListings = demandMaterials.length;
  const thisWeek = demandMaterials.filter((m) =>
    isAfter(m.createdDate, startDate),
  ).length;
  const buyers = new Set(demandMaterials.map((m) => m.companyId));

  return (
    <div className="p-4 flex flex-col gap-4">
      <DemandHero
        activeListings={activeListings}
        countries={countries.size}
        thisWeek={thisWeek}
        buyers={buyers.size}
      />
      <ActiveDemandTable demand={demandMaterials} user={user} />
    </div>
  );
}
