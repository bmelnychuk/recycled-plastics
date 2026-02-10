'use client';

import { LanguageSwitcher } from '@/features/legal/LanguageSwitcher';
import { useLocalStorage } from 'usehooks-ts';
import '@/features/legal/legal.css';

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [language, setLanguage] = useLocalStorage('language', 'en', {
    serializer: (value) => value,
    deserializer: (value) => value,
  });

  return (
    <div className="flex flex-col gap-4 container" data-legal-layout>
      <div className="flex justify-end p-4">
        <LanguageSwitcher value={language} onChange={setLanguage} />
      </div>
      <div data-legal-page>{children}</div>
    </div>
  );
}
