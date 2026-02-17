import { Skeleton } from '@/design-system/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 h-[calc(100dvh-10rem)] overflow-hidden">
      {/* Thread list */}
      <div className="col-span-12 lg:col-span-3 border-r space-y-3 pr-3 py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-48" />
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="col-span-12 lg:col-span-5 border-r flex flex-col gap-4 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 ${i % 2 === 0 ? 'items-start' : 'items-end'}`}
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton
              className={`h-12 rounded-lg ${i % 2 === 0 ? 'w-3/5' : 'w-2/5'}`}
            />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Side panel */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-3 rounded-lg border p-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex flex-col gap-3 rounded-lg border p-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
