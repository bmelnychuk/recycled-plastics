import { NewSupplyForm } from '@/features/supply/SupplyForm';
import { application } from '@/core';

export default async function Page() {
  const companies = await application.getVerifiedCompanies();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">New material supply</h1>
      <NewSupplyForm companies={companies} />
    </div>
  );
}
