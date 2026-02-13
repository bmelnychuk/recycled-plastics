import { Skeleton } from '@/design-system/components/ui/skeleton';

function HeaderSkeleton() {
  return (
    <div className="bg-accent/40">
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
          {/* Left: company info */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-3 sm:gap-4">
            {/* Logo + name */}
            <div className="flex items-start gap-3 sm:gap-5">
              <Skeleton className="h-16 w-16 rounded-full shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-7 w-48 sm:h-8" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            {/* Contact details row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-56" />
            </div>
            {/* Description */}
            <div className="space-y-1.5 max-w-3xl">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          {/* Right: contact business card */}
          <div className="w-full lg:w-auto lg:min-w-100 lg:shrink-0">
            <div className="rounded-xl border bg-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-14 w-14 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-7 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
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
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}

function MaterialsSkeleton() {
  return (
    <div className="px-4 py-4 sm:px-6">
      {/* Tabs bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-11 w-full sm:w-64 rounded-md" />
      </div>

      {/* Mobile: card list */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <MobileCardSkeleton key={i} />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:flex flex-col gap-3">
        <div className="flex items-center gap-2 bg-accent/50 p-3 rounded-lg">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-48 rounded-md" />
          <div className="flex-1" />
          <Skeleton className="h-9 w-44 rounded-md" />
        </div>
        <div className="rounded-md border">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr>
                {[16, 12, 12, 16, 48, 14, 14, 12].map((w, i) => (
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
              {Array.from({ length: 8 }).map((_, i) => (
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
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen min-w-0">
      <HeaderSkeleton />
      <MaterialsSkeleton />
    </div>
  );
}
