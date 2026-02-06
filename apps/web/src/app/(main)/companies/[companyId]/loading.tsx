import { Skeleton } from "@/design-system/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* CompanyBrandedHeader Skeleton */}
      <div className="relative overflow-hidden bg-slate-200">
        <div className="relative px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Section: Company Info */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Top Section: Logo and Company Name */}
              <div className="flex items-start gap-5">
                {/* Logo */}
                <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />

                {/* Company Name and Industry */}
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>

              {/* Company Details - Inline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-64" />
              </div>

              {/* Description */}
              <div className="space-y-2 max-w-3xl">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Right Section: Contact Card */}
            <div className="min-w-100">
              <Skeleton className="h-48 w-96 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* CompanyMaterials Skeleton */}
      <div className="px-4 py-4">
        {/* Tabs Header */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex gap-2 p-1 bg-slate-100/60 rounded-lg">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-32" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        {/* Table Skeleton */}
        <div className="mt-4 space-y-3">
          {/* Table Header */}
          <div className="flex gap-4 pb-2 border-b">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 py-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
