import { notFound } from 'next/navigation';
import { NewDemandForm } from '@/features/demand/DemandForm';
import { application } from '@/core';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const [user, company] = await Promise.all([
    application.getCurrentUser(),
    application.getCompanyById(companyId),
  ]);

  if (!company || user?.companyId !== companyId) {
    notFound();
  } else {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold mb-6">
          {company.name} - new material demand
        </h1>
        <NewDemandForm companies={[company]} companyId={companyId} />
      </div>
    );
  }
}
