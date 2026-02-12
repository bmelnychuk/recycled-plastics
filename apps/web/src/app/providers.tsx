'use client';

import { ThemeProvider } from '@/features/theme/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';

import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider appearance={{ theme: shadcn }}>
        <Toaster position="top-center" />
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
};
