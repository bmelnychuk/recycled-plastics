import { Skeleton } from '@/design-system/components/ui/skeleton';

function HeroSkeleton() {
  return (
    <div className="rounded-lg border bg-accent/30 p-4 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-7 w-20 sm:h-8 sm:w-24" />
          <Skeleton className="h-4 w-64 sm:h-5 sm:w-80" />
        </div>
        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: flex row */}
        <div className="hidden sm:flex flex-wrap gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-3 flex flex-col gap-2">
      <div className="flex gap-3">
        <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function MobileTableSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Search bar + CTA */}
      <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MobileCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function DesktopTableSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Filters bar */}
      <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="h-9 w-48 rounded-md" />
        <div className="flex-1" />
        <Skeleton className="h-9 w-44 rounded-md" />
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b">
            <tr>
              {[16, 12, 12, 16, 48, 14, 14, 28, 12].map((w, i) => (
                <th
                  key={i}
                  className="h-12 px-4 text-left align-middle font-medium"
                >
                  <Skeleton className="h-4" style={{ width: `${w * 4}px` }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-4 align-middle">
                  <Skeleton className="h-[72px] w-[72px] rounded-lg" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-full max-w-xs" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-14" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="p-4 align-middle">
                  <Skeleton className="h-5 w-5 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <HeroSkeleton />
      {/* Mobile */}
      <div className="md:hidden">
        <MobileTableSkeleton />
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopTableSkeleton />
      </div>
    </div>
  );
}
