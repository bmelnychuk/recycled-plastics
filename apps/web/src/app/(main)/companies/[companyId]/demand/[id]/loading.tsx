import {
  Card,
  CardContent,
  CardHeader,
} from "@/design-system/components/ui/card";
import { Skeleton } from "@/design-system/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Main Content - Material Details */}
      <div className="col-span-12 lg:col-span-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </CardHeader>
          <CardContent className="flex flex-col gap-12 pb-12">
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Stats Grid */}
            <section>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-24 mt-2" />
                  </div>
                ))}
              </div>
            </section>

            {/* Material Properties */}
            <section>
              <Skeleton className="h-4 w-40 mb-3" />
              <div className="overflow-hidden rounded-xl border border-slate-300">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <tbody className="divide-y divide-slate-300 bg-white">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i}>
                        <th className="w-1/3 whitespace-nowrap bg-slate-50 px-4 py-3">
                          <Skeleton className="h-3 w-24" />
                        </th>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-32" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Documents */}
            <section>
              <Skeleton className="h-4 w-32 mb-3" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pictures */}
            <section>
              <Skeleton className="h-4 w-24 mb-3" />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <Skeleton className="h-full w-full" />
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Company & Contact Cards */}
      <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
        {/* Company Business Card */}
        <Card className="bg-white/95 backdrop-blur-sm h-full">
          <CardHeader className="flex flex-row items-center gap-3 pb-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>

          <CardContent className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Contact Business Card */}
        <Card className="h-full w-full flex flex-col justify-between">
          <CardHeader className="flex items-start gap-4 align-center">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-start gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
