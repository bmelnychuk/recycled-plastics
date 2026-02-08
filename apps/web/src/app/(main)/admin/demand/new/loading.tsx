import { Skeleton } from '@/design-system/components/ui/skeleton';
import { Separator } from '@/design-system/components/ui/separator';

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <Skeleton className="h-8 w-80 mb-6" />

      <div className="flex flex-col gap-8">
        {/* Company Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-72 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <Separator />

        {/* General Information Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-80 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Material Specifications Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-48 mb-1" />
            <Skeleton className="h-4 w-80 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full sm:col-span-3 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-40" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
            <div className="col-span-full sm:col-span-3 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
            <div className="col-span-full sm:col-span-3 space-y-2">
              <Skeleton className="h-4 w-1 invisible" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Commercial Information Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-48 mb-1" />
            <Skeleton className="h-4 w-80 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Documents Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-72 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-12">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Images Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-72 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-12">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 shrink-0" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
