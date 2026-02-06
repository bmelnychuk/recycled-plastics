import {
  Card,
  CardContent,
  CardHeader,
} from "@/design-system/components/ui/card";
import { Skeleton } from "@/design-system/components/ui/skeleton";
import { Separator } from "@/design-system/components/ui/separator";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:flex-row">
      {/* Materials Card - Left Side */}
      <div className="flex-1">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr className="border-b transition-colors">
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
                        <Skeleton className="h-4 w-12" />
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <Skeleton className="h-4 w-20" />
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <Skeleton className="h-4 w-12" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors"
                      >
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
                          <Skeleton className="h-4 w-full max-w-xs" />
                        </td>
                        <td className="p-4 align-middle">
                          <Skeleton className="h-4 w-16" />
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* News Card - Right Side */}
      <div className="flex w-full flex-col gap-4 lg:w-100">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <Skeleton className="h-7 w-32 mb-2" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div className="flex flex-col gap-2 p-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                  {i < 7 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
