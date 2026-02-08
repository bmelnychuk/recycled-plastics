import { ReactNode } from 'react';
import { getCurrentUser } from '@/server';
import { redirect } from 'next/navigation';

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  return children;
}
