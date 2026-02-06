import { getVerifiedCompanies } from "@/backend/api";
import { NewDemandForm } from "@/features/demand/DemandForm";

export default async function Page() {
  const companies = await getVerifiedCompanies();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">New material demand</h1>
      <NewDemandForm companies={companies} />
    </div>
  );
}
