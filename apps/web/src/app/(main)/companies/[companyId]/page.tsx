import {
  getCompanyDetails,
  getCompanyDemand,
  getCompanySupply,
  getCompanyUsers,
} from "@/backend/api";
import { getSignedInUser } from "@/backend/api/session";
import { CompanyBrandedHeader } from "@/composite/company/CompanyBrandedHeader";
import { CompanyMaterials } from "@/composite/company/CompanyMaterials";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.role === "admin";

  const { companyId } = await params;
  const user = await getSignedInUser();
  const fetchUsers = isAdmin || user.companyId === companyId;

  const [company, demand, supply, users] = await Promise.all([
    getCompanyDetails(companyId),
    getCompanyDemand(companyId),
    getCompanySupply(companyId),
    fetchUsers ? getCompanyUsers(companyId) : Promise.resolve([]),
  ]);

  if (!company) notFound();

  return (
    <div className="min-h-screen">
      <CompanyBrandedHeader company={company} />
      <CompanyMaterials
        users={users}
        company={company}
        supply={supply}
        demand={demand}
        user={user}
      />
    </div>
  );
}
