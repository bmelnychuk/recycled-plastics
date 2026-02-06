import { Skeleton } from "@/design-system/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4">
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
