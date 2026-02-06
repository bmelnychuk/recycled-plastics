import { getCompanyDetails, getSupplyMaterial } from "@/backend";
import { getSignedInUser } from "@/backend/api/session";
import { EditSupplyForm } from "@/features/supply/SupplyForm";
import { notFound } from "next/navigation";

interface PageProps {
  companyId: string;
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { companyId, id } = await params;
  const [user, company, supply] = await Promise.all([
    getSignedInUser(),
    getCompanyDetails(companyId),
    getSupplyMaterial(companyId, id),
  ]);

  if (!company || user.companyId !== companyId) {
    notFound();
  } else {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold mb-6">{company.name} - edit supply material</h1>
        <EditSupplyForm supply={supply} companies={[company]} />
      </div>
    );
  }
}
