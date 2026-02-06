"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/design-system/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { CurrentUserNavigationItem } from "@/features/common/CurrentUserNavigationItem";
import { Button } from "@/design-system/components/ui/button";
import { Sparkles } from "lucide-react";
import { FC } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton } from "@/features/auth/SignInButton";
import { Badge } from "@/design-system/components/ui/badge";
import { SignedInUser } from "@/backend";
import { usePathname } from "next/navigation";
import { cn } from "@/design-system/lib/utils";

interface Props {
  user?: SignedInUser;
}

export const NavigationBar: FC<Props> = ({ user }) => {
  const pathname = usePathname();
  const isAdmin = user?.isAdmin;
  const isPro = user?.plan === "pro";
  // const showAnalytics = isAdmin || isPro;
  // const offerUpgrade = !isPro && !isAdmin;
  const showAnalytics = false;  
  const offerUpgrade = false;

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="px-4 flex flex-row h-16 items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              width={24}
              height={24}
              alt="Recycled Plastics"
            />
            <h1 className="text-xl font-bold">Recycled Plastics</h1>
          </div>
        </Link>
        <NavigationMenu className="z-1" viewport={false}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive("/supply") && "bg-accent"
                )}
              >
                <Link href="/supply">Supply</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive("/demand") && "bg-accent"
                )}
              >
                <Link href="/demand">Demand</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {showAnalytics && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive("/analytics") && "bg-accent"
                  )}
                >
                  <Link href="/analytics">Analytics</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(isActive("/admin") && "bg-accent")}
                >
                  Admin
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/companies">
                          <div className="text-sm leading-none font-medium">
                            Companies
                          </div>
                          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Browse all companies. Approve pending companies.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/users">
                          <div className="text-sm leading-none font-medium">
                            Users
                          </div>
                          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Browse all users. Update user details.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/admin/materials">
                          <div className="text-sm leading-none font-medium">
                            Materials
                          </div>
                          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Approve pending supply and demand materials.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {offerUpgrade && (
            <Button asChild>
              <Link href="/billing">
                <Sparkles /> Upgrade to Pro
              </Link>
            </Button>
          )}
          {isAdmin && (
            <Badge className="bg-blue-500 text-white dark:bg-blue-600 text-xs sm:text-sm">
              Admin
            </Badge>
          )}
          {user && <CurrentUserNavigationItem user={user} />}
        </SignedIn>
      </div>
    </div>
  );
};
