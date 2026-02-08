import {
  getCompanyById,
  getCompanyDemand,
  getCompanySupply,
  getCompanyUsers,
  getCurrentUser,
} from '@/server';
import { CompanyBrandedHeader } from '@/composite/company/CompanyBrandedHeader';
import { CompanyMaterials } from '@/composite/company/CompanyMaterials';
import { notFound } from 'next/navigation';

export default async function Page() {
  const user = await getCurrentUser();
  const companyId = user?.companyId;

  if (!companyId || !user.isCompanyVerified) notFound();

  const isCompanyUser = user?.companyId === companyId || user?.isAdmin;

  const [company, demand, supply, users] = await Promise.all([
    getCompanyById(companyId),
    getCompanyDemand(companyId),
    getCompanySupply(companyId),
    isCompanyUser ? getCompanyUsers(companyId) : Promise.resolve([]),
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
