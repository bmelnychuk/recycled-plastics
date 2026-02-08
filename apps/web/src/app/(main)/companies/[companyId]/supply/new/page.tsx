import { getCurrentUser, getCompanyById } from '@/server';
import { NewSupplyForm } from '@/features/supply/SupplyForm';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  try {
    const [user, company] = await Promise.all([
      getCurrentUser(),
      getCompanyById(companyId),
    ]);
    
    if (!company || !user) notFound();

    return (
      <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold mb-6">
          {company.name} - new material supply
        </h1>
        <NewSupplyForm user={user} companies={[company]} companyId={companyId} />
      </div>
    );

  } catch (error) {
    console.error(error);
    notFound();
  }
}
