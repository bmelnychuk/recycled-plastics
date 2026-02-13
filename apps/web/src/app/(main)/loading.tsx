import {
  Card,
  CardContent,
  CardHeader,
} from '@/design-system/components/ui/card';
import { Skeleton } from '@/design-system/components/ui/skeleton';

function HeroCompactSkeleton() {
  return (
    <div className="rounded-lg border bg-accent/30 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-20 sm:h-8 sm:w-24" />
          <Skeleton className="h-4 w-56 sm:w-72" />
        </div>
        <div className="flex flex-wrap gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
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
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center gap-1.5 py-1">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

function DesktopTableSkeleton() {
  return (
    <div className="hidden flex-col gap-1 md:flex">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b">
            {[12, 16, 48, 12, 28, 14].map((w, i) => (
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
          {Array.from({ length: 15 }).map((_, i) => (
            <tr key={i} className="border-b">
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
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </td>
              <td className="p-4 align-middle">
                <Skeleton className="h-5 w-16 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Compact hero cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <HeroCompactSkeleton />
        <HeroCompactSkeleton />
      </div>

      {/* Mobile: plain layout */}
      <div className="flex flex-col h-full md:hidden">
        <div className="flex items-start justify-between gap-4 pt-6 pb-4">
          <div className="py-3 -my-3 space-y-1.5">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <MobileCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Desktop: card layout */}
      <Card className="hidden flex-col h-full md:flex">
        <CardHeader>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <DesktopTableSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}
