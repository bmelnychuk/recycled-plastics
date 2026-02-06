import { getUnverifiedDemand, getUnverifiedSupply } from "@/backend";
import { MaterialsTable } from "@/features/admin/MaterialsTable";

export default async function Page() {
  const [demand, supply] = await Promise.all([
    getUnverifiedDemand(),
    getUnverifiedSupply(),
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Unverified Materials</h1>
      <MaterialsTable materials={[
        ...demand.map((d) => ({ ...d, side: "demand" as const })),
        ...supply.map((s) => ({ ...s, side: "supply" as const })),
      ]} />
    </div>
  );
}
