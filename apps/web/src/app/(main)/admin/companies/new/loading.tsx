import { Skeleton } from '@/design-system/components/ui/skeleton';
import { Separator } from '@/design-system/components/ui/separator';

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <Skeleton className="h-8 w-40 mb-6" />

      <div className="flex flex-col gap-8">
        {/* General Information Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-72 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Information Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-44 mb-1" />
            <Skeleton className="h-4 w-64 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-3 space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-3 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Branding Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-64 mb-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-32 w-32 rounded-lg mt-2" />
            </div>
            <div className="col-span-full space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Verification Section */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-36 mb-1" />
          </div>
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  );
}
