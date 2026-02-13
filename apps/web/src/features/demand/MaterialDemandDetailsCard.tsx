import { MaterialDemand, SignedInUser } from '@rp/core';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { CircleFlag } from 'react-circle-flags';
import { CheckCircle, Circle, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/design-system/components/ui/button';
import { FC } from 'react';
import { formatDate } from '../../composite/common/date-utils';
import { formatPrice } from '../../composite/common/price-utils';
import { MaterialDataTable } from '@/features/material/MaterialDataTable';
import { CountryName } from '@/features/common/CountryName';
import { ColorLabel } from '@/features/material/MaterialColor';
import { cn } from '@/design-system/lib/utils';

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
    <p className="mt-1 text-base font-semibold">{value}</p>
  </div>
);

const DemandTitle: FC<{ demand: MaterialDemand }> = ({ demand }) => {
  return (
    <div className="flex items-center gap-2">
      <div>{demand.material.type.toUpperCase()}</div>
      <ColorLabel color={demand.material.color} />
    </div>
  );
};

export const MaterialDemandDetailsCard: FC<{
  material: MaterialDemand;
  user?: SignedInUser;
}> = ({ material, user }) => {
  const canEdit = user?.companyId === material.companyId || user?.isAdmin;

  return (
    <Card className="border-0 bg-transparent shadow-none py-0 lg:border lg:bg-card lg:shadow-sm lg:py-6">
      <CardHeader className="px-0 lg:px-6">
        <CardTitle className="text-xl font-semibold">
          <DemandTitle demand={material} />
        </CardTitle>
        <CardDescription>
          <div>
            Listed {formatDate(material.createdDate)} • Last updated{' '}
            {formatDate(material.updatedDate)}
          </div>
          <div
            className={cn(
              'mt-1 flex items-center gap-1.5 text-sm',
              material.verified ? 'text-green-600' : 'text-slate-500',
            )}
          >
            {material.verified ? (
              <CheckCircle className="size-4 shrink-0" aria-hidden />
            ) : (
              <Circle className="size-4 shrink-0" aria-hidden />
            )}
            <span>{material.verified ? 'Verified' : 'Unverified'}</span>
          </div>
        </CardDescription>
        {canEdit && (
          <CardAction>
            <Button variant="outline" asChild>
              <Link
                href={`/companies/${material.companyId}/demand/${material.id}/edit`}
              >
                Edit
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-12 pb-12 px-0 lg:px-6">
        <p className="leading-relaxed">{material.description}</p>
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Price / kg" value={formatPrice(material.price)} />
            <Stat
              label="Available"
              value={`${material.amount.toLocaleString()} t`}
            />
            <div className="rounded-lg border px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide">
                Location
              </p>
              <div className="mt-1 text-base font-semibold flex items-center gap-3">
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
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Material Properties
            </h3>
          </div>
          <MaterialDataTable material={material.material} />
        </section>
        {Boolean(material.documents?.length) && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Documents
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {material.documents?.map((document, index) => (
                <a
                  key={document.id}
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition hover:border-primary/60 hover:bg-muted/50"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="flex-1 min-w-0 truncate font-medium">
                    {document.name}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};
