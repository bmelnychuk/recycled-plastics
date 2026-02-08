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
    <div className="flex min-h-screen">
      {/* Vertical Navigation Menu */}
      <aside className="w-64 border-r">
        <SettingsNavigation />
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
