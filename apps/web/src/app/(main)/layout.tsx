import { Footer } from '@/features/common/Footer';
import {
  NavigationBar,
  NavigationBarMobile,
} from '@/features/common/NavigationBar';
import { ScrollArea } from '@/design-system/components/ui/scroll-area';
import { getCurrentUser } from '@/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signedInUser = await getCurrentUser();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <nav className="w-full min-w-0 shrink-0 border-b">
        <div className="md:hidden">
          <NavigationBarMobile user={signedInUser} />
        </div>
        <div className="hidden md:block">
          <NavigationBar user={signedInUser} />
        </div>
      </nav>
      <ScrollArea className="min-h-0 flex-1">
        <main className="min-w-0 overflow-x-hidden">
          {children}
          <Footer />
        </main>
      </ScrollArea>
    </div>
  );
}
