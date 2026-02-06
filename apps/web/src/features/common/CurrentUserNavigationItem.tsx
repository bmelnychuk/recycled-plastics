"use client";

import { Avatar, AvatarFallback } from "@/design-system/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/design-system/components/ui/dropdown-menu";
import { Building2, LogOut, Sparkles, User } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

import Link from "next/link";

import { FC } from "react";
import { SignedInUser } from "@/backend";

interface Props {
  user: SignedInUser;
}

export const CurrentUserNavigationItem: FC<Props> = ({ user }) => {
  const { signOut } = useClerk();
  const idAdmin = user.isAdmin;

  // const offerUpgrade = user.plan !== "pro" && !idAdmin;
  const offerUpgrade = false;
  
  const initial = user.firstName.charAt(0).toUpperCase();

  const hasVerifiedCompany = user.companyId && user.company?.verified;  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border border-black">
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        alignOffset={8}
        className="w-64"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-3 py-3 text-left text-sm">
            <Avatar className="h-10 w-10 border border-black">
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-0.5 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.firstName} {user.lastName}
              </span>
              <span className="mt-0.5 truncate text-xs font-medium text-primary">
                {user.plan === "pro" ? "Pro" : "Free"} Plan
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={hasVerifiedCompany ? "/company" : "/company-profile"}>
            <Building2 />
            My Company
          </Link>
        </DropdownMenuItem>
        {offerUpgrade && (
          <DropdownMenuItem asChild>
            <Link href="/billing">
              <Sparkles /> Upgrade to Pro
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
