import { getCurrentUser, getCompanyById, getDemandById } from '@/core';
import { EditDemandForm } from '@/features/demand/DemandForm';
import { notFound } from 'next/navigation';

interface PageProps {
  companyId: string;
  id: string;
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { companyId, id } = await params;
  const [user, company, demand] = await Promise.all([
    getCurrentUser(),
    getCompanyById(companyId),
    getDemandById(companyId, id),
  ]);

  if (!company || user?.companyId !== companyId) {
    notFound();
  } else {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="text-2xl font-bold mb-6">
          {company.name} - edit demand material
        </h1>
        <EditDemandForm demand={demand} companies={[company]} />
      </div>
    );
  }
}
