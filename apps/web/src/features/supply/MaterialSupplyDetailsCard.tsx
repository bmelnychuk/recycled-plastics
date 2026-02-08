import { MaterialSupply, SignedInUser } from '@rp/core';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import Image from 'next/image';
import { ImageZoom } from '@/design-system/components/ui/shadcn-io/image-zoom';
import { cn } from '@/design-system/lib/utils';
import { CircleFlag } from 'react-circle-flags';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/design-system/components/ui/button';
import { FC } from 'react';
import { formatDate } from '../../composite/common/date-utils';
import { formatPrice } from '../../composite/common/price-utils';
import { MaterialDataTable } from '@/features/material/MaterialDataTable';
import { CountryName } from '@/features/common/CountryName';

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
  </div>
);

export const MaterialSupplyDetailsCard: FC<{
  material: MaterialSupply;
  user?: SignedInUser;
}> = ({ material, user }) => {
  const canEdit = user?.companyId === material.companyId || user?.isAdmin;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">
          {material.name}
        </CardTitle>
        <CardDescription>
          Listed {formatDate(material.createdDate)} • Last updated{' '}
          {formatDate(material.updatedDate)}
        </CardDescription>
        {canEdit && (
          <CardAction>
            <Button variant="outline" asChild>
              <Link
                href={`/companies/${material.companyId}/supply/${material.id}/edit`}
              >
                Edit
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-12 pb-12">
        <p className="leading-relaxed text-slate-900">{material.description}</p>
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Price / kg" value={formatPrice(material.price)} />
            <Stat
              label="Available"
              value={`${material.amount.toLocaleString()} kg`}
            />
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Location
              </p>
              <div className="mt-1 text-base font-semibold text-slate-900 flex items-center gap-3">
                <CircleFlag
                  countryCode={material.location.country.toLowerCase()}
                  height="20"
                  width="20"
                />
                <div>
                  <CountryName countryCode={material.location.country} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              Material Properties
            </h3>
          </div>
          <MaterialDataTable material={material.material} />
        </section>
        {Boolean(material.documents?.length) && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Documents
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {material.documents?.map((document, index) => (
                <a
                  key={`${document}-${index}`}
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <FileText className="size-4" aria-hidden />
                    </span>
                    <span className="flex-1 min-w-0 line-clamp-2 break-words text-left">
                      {document.name}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
        {Boolean(material.pictures?.length) && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Pictures
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {material.pictures?.map((picture, index) => (
                <ImageZoom
                  key={picture.id}
                  className="block"
                  backdropClassName={cn(
                    '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80',
                  )}
                >
                  <figure className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
                    <Image
                      src={picture.url}
                      unoptimized
                      alt={`Material preview ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-200"
                    />
                  </figure>
                </ImageZoom>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};
