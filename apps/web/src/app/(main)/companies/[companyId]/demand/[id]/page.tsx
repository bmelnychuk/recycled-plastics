import { CompanyBusinessCard } from '@/features/company/CompanyBusinessCard';
import { CompanyTeaserCard } from '@/features/company/CompanyTeaserCard';
import { ContactBusinessCard } from '@/composite/company/ContactBusinessCard';
import { MaterialDemandDetailsCard } from '@/features/demand/MaterialDemandDetailsCard';
import { getDemandById, getCompanyById, getCurrentUser, getMessagesByTopic } from '@/server';
import { SendNewMessageButton } from '@/features/communication/SendNewMessageButton';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string; id: string }>;
}) {
  const { companyId, id } = await params;
  const [demand, company, user, messages] = await Promise.all([
    getDemandById(companyId, id),
    getCompanyById(companyId),
    getCurrentUser(),
    getMessagesByTopic({ topic: { type: 'demand', companyId, id } }),
  ]);

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-8">
        <MaterialDemandDetailsCard material={demand} user={user} />
      </div>
      <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
        {company && (
          <div className="flex flex-col gap-4">
            <CompanyBusinessCard company={company} action={
              <SendNewMessageButton
                company={company}
                demand={demand}
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
