import { Skeleton } from '@/design-system/components/ui/skeleton';
import { Separator } from '@/design-system/components/ui/separator';

function SectionSkeleton({
  fields,
}: {
  fields: Array<'full' | 'half' | 'textarea' | 'logo'>;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      {/* Section header */}
      <div className="md:w-[30%] flex flex-col gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      {/* Section fields */}
      <div className="md:w-[70%] flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          {fields.map((type, i) => {
            if (type === 'logo') {
              return (
                <div key={i} className="col-span-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-32 w-32 rounded-lg" />
                  <Skeleton className="h-3 w-28" />
                </div>
              );
            }
            if (type === 'textarea') {
              return (
                <div key={i} className="col-span-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
              );
            }
            if (type === 'half') {
              return (
                <div key={i} className="col-span-3 flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-full" />
                </div>
              );
            }
            return (
              <div key={i} className="col-span-full flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="p-6 md:p-10 flex flex-col gap-6">
      {/* Title */}
      <Skeleton className="h-8 w-36" />

      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* General Information: name, description (textarea), industry */}
        <SectionSkeleton fields={['full', 'textarea', 'full']} />

        <Separator />

        {/* Contact Information: email, website, phone, street, city+zip, country */}
        <SectionSkeleton
          fields={['full', 'full', 'full', 'full', 'half', 'half', 'full']}
        />

        <Separator />

        {/* Main Contact: first+last, title, email, phone */}
        <SectionSkeleton fields={['half', 'half', 'full', 'full', 'full']} />

        <Separator />

        {/* Branding: logo, color */}
        <SectionSkeleton fields={['logo', 'full']} />

        {/* Submit button */}
        <div className="flex items-center justify-end">
          <Skeleton className="h-9 w-36" />
        </div>
      </div>
    </div>
  );
}
