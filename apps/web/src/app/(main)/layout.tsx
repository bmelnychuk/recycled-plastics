import { Footer } from "@/features/common/Footer";
import { NavigationBar } from "@/features/common/NavigationBar";
import { ScrollArea } from "@/design-system/components/ui/scroll-area";

import { getCurrentUser } from "@/backend/api/session";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <ScrollArea className="h-screen">
      <nav className="border-b">
        <NavigationBar user={user ?? undefined} />
      </nav>
      <main className="flex-1">
        {children}
        <Footer />
      </main>
    </ScrollArea>
  );
}
