import { getAllCompanies } from '@/core';

import { CompaniesTable } from '@/features/company/CompaniesTable';

export default async function Page() {
  const companies = await getAllCompanies();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>
      <CompaniesTable companies={companies} />
    </div>
  );
}
