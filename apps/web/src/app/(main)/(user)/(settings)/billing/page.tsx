import { BillingInfo } from '@/features/settings/billing/BillingInfo';
import { application } from '@/core';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await application.getCurrentUser();

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
