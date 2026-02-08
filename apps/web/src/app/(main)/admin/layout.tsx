import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { application } from '@/core';

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await application.getCurrentUser();
  if (!user?.isAdmin) redirect('/');

  return children;
}
