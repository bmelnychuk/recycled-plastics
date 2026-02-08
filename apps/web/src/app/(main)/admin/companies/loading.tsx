import { Skeleton } from '@/design-system/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-4">
      <Skeleton className="h-8 w-40 mb-6" />

      <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-3 rounded-lg justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-100 h-10" />
          <Skeleton className="w-32 h-10" />
        </div>
        <Skeleton className="w-36 h-10" />
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-16" />
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
                <tr key={i} className="border-b transition-colors">
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-40" />
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
