'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/design-system/components/ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/icon.png"
                width={32}
                height={32}
                alt="Recycled Plastics logo"
                className="rounded-sm"
              />
              <h2 className="text-xl font-bold">Recycled Plastics</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-[280px]">
              Your trusted platform for circular economy insights, materials
              tracking, and sustainable pricing data.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/supply"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Supply
              </Link>
              <Link
                href="/demand"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Demand
              </Link>
            </nav>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/legal/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/imprint"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Imprint
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Recycled Plastics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
