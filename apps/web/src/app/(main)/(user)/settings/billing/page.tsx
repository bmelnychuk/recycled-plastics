import { BillingInfo } from '@/features/settings/billing/BillingInfo';
import { getCurrentUser } from '@/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className="p-10">
        <BillingInfo user={user} />
      </div>
    );
  } else {
    redirect('/');
  }
}
