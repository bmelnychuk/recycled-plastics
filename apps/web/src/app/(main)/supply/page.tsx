import { getSupplyMaterials } from "@/backend/api";
import { getCurrentUser } from "@/backend/api/session";
import { SupplyHero } from "@/features/supply/SupplyHero";
import { ActiveSupplyTable } from "@/features/supply/SupplyTable";
import { isAfter, subDays } from "date-fns";

export const generateMetadata = () => ({
  title: "Materials | Recycled Plastics",
  description:
    "Browse a list of materials including PET, HDPE, LDPE, PP, PS, ABS, PC, PA, PE and more. See descriptions, colors, countries and prices.",
});

export default async function Page() {
  const [user, supplyMaterials] = await Promise.all([
    getCurrentUser(),
    getSupplyMaterials(),
  ]);

  const startDate = subDays(new Date(), 7);

  const countries = new Set(supplyMaterials.map((material) => material.location.country));
  const activeListings = supplyMaterials.length;
  const thisWeek = supplyMaterials.filter((material) => isAfter(material.createdDate, startDate)).length;
  const suppliers = new Set(supplyMaterials.map((material) => material.companyId));

  return (
    <div className="p-4 flex flex-col gap-4">
      <SupplyHero activeListings={activeListings} countries={countries.size} thisWeek={thisWeek} suppliers={suppliers.size} />
      <ActiveSupplyTable supply={supplyMaterials} user={user} />
    </div>
  );
}
