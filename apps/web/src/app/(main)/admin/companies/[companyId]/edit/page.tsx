import { getCompanyById } from '@/server';
import { EditCompanyForm } from '@/features/company/CompanyForm';
import { notFound } from 'next/navigation';

export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const companyData = await getCompanyById(companyId);

  if (!companyData) notFound();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">
        {companyData.name} - edit company
      </h1>
      <EditCompanyForm id={companyId} defaultValues={companyData} />
    </div>
  );
}
