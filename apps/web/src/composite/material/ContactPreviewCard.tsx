import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/design-system/components/ui/avatar";

export const ContactPreviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact person</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
              alt="Samantha Carter"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-slate-900">John Doe</p>
            <p className="text-sm text-muted-foreground">
              Senior Account Manager
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email
            </p>
            <a
              href="mailto:samantha.carter@recycled-plastics.com"
              className="font-medium text-primary transition hover:text-primary/80"
            >
              samantha.carter@recycled-plastics.com
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Phone
            </p>
            <a
              href="tel:+49301234567"
              className="font-medium text-primary transition hover:text-primary/80"
            >
              +49 30 123 4567
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              LinkedIn
            </p>
            <a
              href="https://www.linkedin.com/in/samanthacarter"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary transition hover:text-primary/80"
            >
              linkedin.com/in/samanthacarter
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Last time online
            </p>
            <p className="font-medium text-slate-900">2 hours ago</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Date registered
            </p>
            <p className="font-medium text-slate-900">March 18, 2021</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
