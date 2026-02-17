import {
  getSupplyById,
  getCompanyById,
  getCurrentUser,
  getMessagesByTopic,
} from '@/server';
import { CompanyBusinessCard } from '@/features/company/CompanyBusinessCard';
import { CompanyTeaserCard } from '@/features/company/CompanyTeaserCard';
import { MaterialSupplyDetailsCard } from '@/features/supply/MaterialSupplyDetailsCard';
import { SendNewMessageButton } from '@/features/communication/SendNewMessageButton';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string; id: string }>;
}) {
  const { companyId, id } = await params;
  const [supply, company, user, messages] = await Promise.all([
    getSupplyById(companyId, id),
    getCompanyById(companyId),
    getCurrentUser(),
    getMessagesByTopic({ topic: { type: 'supply', companyId, id } }),
  ]);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-8">
        <MaterialSupplyDetailsCard material={supply} user={user} />
      </div>
      <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
        {company && (
          <div className="flex flex-col gap-4">
            <CompanyBusinessCard company={company} action={
              <SendNewMessageButton
                company={company}
                supply={supply}
                messages={messages}
                user={user}
              />
            } />
          </div>
        )}
        {!company && <CompanyTeaserCard />}
      </div>
    </div>
  );
}
