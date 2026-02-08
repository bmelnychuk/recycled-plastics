'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/design-system/components/ui/separator';
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  FileText,
  HelpCircle,
  Shield,
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
            <div className="flex items-center gap-4">
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="mailto:contact@recycled-plastics.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a> */}
            </div>
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
                href="/materials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Materials
              </Link>
              <Link
                href="/prices"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Prices
              </Link>
            </nav>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <FileText className="size-4" />
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <HelpCircle className="size-4" />
                Support
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Shield className="size-4" />
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GDPR
              </a>
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
