import {
  getCurrentUser,
  getCompanyById,
  getCompanyDemand,
  getCompanySupply,
  getCompanyUsers,
} from '@/server';
import { CompanyBrandedHeader } from '@/composite/company/CompanyBrandedHeader';
import { CompanyMaterials } from '@/composite/company/CompanyMaterials';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const user = await getCurrentUser();

  const isCompanyUser = user?.companyId === companyId || user?.isAdmin;

  const [company, demand, supply, users] = await Promise.all([
    getCompanyById(companyId),
    getCompanyDemand(companyId),
    getCompanySupply(companyId),
    isCompanyUser ? getCompanyUsers(companyId) : Promise.resolve([]),
  ]);

  if (!company || !user) notFound();

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
