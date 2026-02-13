import { ReactNode } from 'react';
import { getCurrentUser } from '@/server';
import { redirect } from 'next/navigation';
import { SettingsNavigation } from '@/features/settings/SettingsNavigation';

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b md:w-64 md:border-b-0 md:border-r">
        <SettingsNavigation />
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
