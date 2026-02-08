import { getCurrentUser, getCompanyById, getCompanyDemand, getCompanySupply } from '@/core';
import { CompanyBrandedHeader } from '@/composite/company/CompanyBrandedHeader';
import { CompanyMaterials } from '@/composite/company/CompanyMaterials';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.role === 'admin';

  const { companyId } = await params;
  const user = await getCurrentUser();

  const [company, demand, supply] = await Promise.all([
    getCompanyById(companyId),
    getCompanyDemand(companyId),
    getCompanySupply(companyId),
  ]);

  if (!company || !user) notFound();

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
