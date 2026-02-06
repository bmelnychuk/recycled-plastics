import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/design-system/components/ui/sheet";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  url?: string;
}

export const DatasheetDrawerPreview: FC<Props> = ({ children, url }) => {
  if (!url) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[600px] max-w-[600px] ">
        <SheetHeader>
          <SheetTitle>PP-123321</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4 h-full">
          <iframe
            src={url}
            title="Document preview"
            className="w-full h-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
