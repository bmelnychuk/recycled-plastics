import { Skeleton } from "@/design-system/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* SupplyHero Skeleton */}
      <div className="rounded-lg border bg-emerald-50/50 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="flex flex-wrap gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-16" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b transition-colors hover:bg-muted/50"
                >
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
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-full max-w-md" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-6 w-6 rounded-full" />
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
