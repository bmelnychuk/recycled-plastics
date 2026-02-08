import { NewCompanyForm } from '@/features/company/CompanyForm';
import { getCurrentUser } from '@/server';
import { redirect } from 'next/navigation';

export default async function NewCompanyPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">New company</h1>
      <NewCompanyForm user={user} />
    </div>
  );
}
