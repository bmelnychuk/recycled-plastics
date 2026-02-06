import {
  getCompanyDetails,
  getCompanyDemand,
  getCompanySupply,
  getCompanyUsers,
} from "@/backend/api";
import { getSignedInUser } from "@/backend/api/session";
import { CompanyBrandedHeader } from "@/composite/company/CompanyBrandedHeader";
import { CompanyMaterials } from "@/composite/company/CompanyMaterials";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await getSignedInUser();
  const companyId = user?.companyId;

  if (!companyId || !user.company?.verified) notFound();

  if (user.isAdmin) {
    const [company, demand, supply, users] = await Promise.all([
      getCompanyDetails(companyId),
      getCompanyDemand(companyId),
      getCompanySupply(companyId),
      getCompanyUsers(companyId),
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
  } else {
    const [company, demand, supply] = await Promise.all([
      getCompanyDetails(companyId),
      getCompanyDemand(companyId),
      getCompanySupply(companyId),
    ]);

    if (!company) notFound();

    return (
      <div className="min-h-screen">
        <CompanyBrandedHeader company={company} />
        <CompanyMaterials
          users={[]}
          company={company}
          supply={supply}
          demand={demand}
          user={user}
        />
      </div>
    );
  }
}
