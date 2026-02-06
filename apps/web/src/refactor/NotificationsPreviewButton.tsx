"use client";

import { Button } from "@/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/design-system/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

// Dummy notifications data
const notifications = [
  {
    id: 1,
    title: "New material available",
    description: "HDPE plastic bottles now available in your area",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "Price update",
    description: "PP granules price has changed",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "Supply confirmed",
    description: "Your material supply request has been confirmed",
    date: "1 day ago",
  },
  {
    id: 4,
    title: "New demand request",
    description: "Someone is looking for PET flakes in Munich",
    date: "1 day ago",
  },
  {
    id: 5,
    title: "System update",
    description: "New features have been added to the analytics dashboard",
    date: "2 days ago",
  },
  {
    id: 6,
    title: "Material inquiry",
    description: "A company has inquired about your LDPE material",
    date: "3 days ago",
  },
  {
    id: 7,
    title: "Verification complete",
    description: "Your company profile has been verified",
    date: "4 days ago",
  },
  {
    id: 8,
    title: "Welcome",
    description: "Welcome to Recycled Plastics platform",
    date: "5 days ago",
  },
  {
    id: 9,
    title: "Price alert",
    description: "HDPE prices have dropped by 15%",
    date: "6 days ago",
  },
  {
    id: 10,
    title: "New connection",
    description: "A new company has started following your updates",
    date: "1 week ago",
  },
];

export const NotificationsPreviewButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-[380px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col gap-1 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {notification.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};