import { CardContent, CardHeader } from "@/design-system/components/ui/card";

import { User } from "@/backend";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/design-system/components/ui/avatar";
import { Card } from "@/design-system/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { FC } from "react";

export const ContactBusinessCard: FC<{ user: User }> = ({ user }) => {
  const displayName = `${user.firstName} ${user.lastName}`;
  const phoneNumber = user.contactData?.phoneNumbers?.[0];
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <Card className="h-full w-full flex flex-col justify-between">
      <CardHeader className="flex items-start gap-4 align-center">
        <Avatar className="h-14 w-14 flex-shrink-0">
          <AvatarImage src="" alt={displayName} />
          <AvatarFallback className="text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-semibold tracking-tight">
            {displayName}
          </h3>
          {user.title && (
            <p className="text-sm text-muted-foreground font-medium">
              {user.title}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <a
          href={`mailto:${user.email}`}
          className="flex items-start gap-3 text-sm group"
        >
          <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span className="break-all group-hover:underline">{user.email}</span>
        </a>

        {phoneNumber ? (
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-start gap-3 text-sm group"
          >
            <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="group-hover:underline">{phoneNumber}</span>
          </a>
        ) : (
          <div className="flex items-start gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">-</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
