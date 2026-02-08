import { getSupplyById, getCompanyById, getCurrentUser } from '@/server';
import { CompanyBusinessCard } from '@/features/company/CompanyBusinessCard';
import { CompanyTeaserCard } from '@/features/company/CompanyTeaserCard';
import { ContactBusinessCard } from '@/composite/company/ContactBusinessCard';
import { MaterialSupplyDetailsCard } from '@/features/supply/MaterialSupplyDetailsCard';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string; id: string }>;
}) {
  const { companyId, id } = await params;
  const [supply, company, user] = await Promise.all([
    getSupplyById(companyId, id),
    getCompanyById(companyId),
    getCurrentUser(),
  ]);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-8">
        <MaterialSupplyDetailsCard material={supply} user={user} />
      </div>
      <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
        {company && (
          <div className="flex flex-col gap-4">
            <CompanyBusinessCard company={company} />
          </div>
        )}
        {company?.mainContact && (
          <div className="flex flex-col gap-4">
            <ContactBusinessCard user={company.mainContact} />
          </div>
        )}
        {!company && <CompanyTeaserCard />}
      </div>
    </div>
  );
}
