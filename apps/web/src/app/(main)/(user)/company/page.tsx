import { getCompanyById, getCompanyDemand, getCompanySupply, getCurrentUser } from '@/core';
import { CompanyBrandedHeader } from '@/composite/company/CompanyBrandedHeader';
import { CompanyMaterials } from '@/composite/company/CompanyMaterials';
import { notFound } from 'next/navigation';

export default async function Page() {
  const user = await getCurrentUser();
  const companyId = user?.companyId;

  if (!companyId || !user.isCompanyVerified) notFound();

  if (user.isAdmin) {
    const [company, demand, supply] = await Promise.all([
      getCompanyById(companyId),
      getCompanyDemand(companyId),
      getCompanySupply(companyId),
    ]);

    if (!company) notFound();

    return (
      <div className="min-h-screen">
        <CompanyBrandedHeader company={company} />
        <CompanyMaterials
          company={company}
          supply={supply}
          demand={demand}
          user={user}
        />
      </div>
    );
  } else {
    const [company, demand, supply] = await Promise.all([
      getCompanyById(companyId),
      getCompanyDemand(companyId),
      getCompanySupply(companyId),
    ]);

    if (!company) notFound();

    return (
      <div className="min-h-screen">
        <CompanyBrandedHeader company={company} />
        <CompanyMaterials
          company={company}
          supply={supply}
          demand={demand}
          user={user}
        />
      </div>
    );
  }
}
