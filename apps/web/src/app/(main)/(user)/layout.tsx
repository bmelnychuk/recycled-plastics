import { ReactNode } from 'react';
import { application } from '@/core';
import { redirect } from 'next/navigation';

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await application.getCurrentUser();
  if (!user) redirect('/');

  return children;
}
