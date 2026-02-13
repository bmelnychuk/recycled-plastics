import { Skeleton } from '@/design-system/components/ui/skeleton';
import { Separator } from '@/design-system/components/ui/separator';

function SectionSkeleton({ fieldCount }: { fieldCount: number }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <div className="md:w-[30%] flex flex-col gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="md:w-[70%] flex flex-col gap-4">
        {Array.from({ length: fieldCount }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="p-6 md:p-10 flex flex-col gap-6">
      <Skeleton className="h-8 w-36" />
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <SectionSkeleton fieldCount={3} />
        <Separator />
        <SectionSkeleton fieldCount={4} />
        <Separator />
        <SectionSkeleton fieldCount={3} />
        <div className="flex items-center justify-end">
          <Skeleton className="h-9 w-36" />
        </div>
      </div>
    </div>
  );
}
