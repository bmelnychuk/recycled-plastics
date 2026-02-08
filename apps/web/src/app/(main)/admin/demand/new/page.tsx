import { getCurrentUser, getVerifiedCompanies } from '@/server';
import { NewDemandForm } from '@/features/demand/DemandForm';
import { redirect } from 'next/navigation';

export default async function Page() {
  const [user, companies] = await Promise.all([
    getCurrentUser(),
    getVerifiedCompanies(),
  ]);

  if (!user) redirect('/');

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold mb-6">New material demand</h1>
      <NewDemandForm user={user} companies={companies} />
    </div>
  );
}
