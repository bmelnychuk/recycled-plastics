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
import { Button } from '@/design-system/components/ui/button';
import { Badge } from '@/design-system/components/ui/badge';
import { FC } from 'react';

const material = {
  id: '650e8400-e29b-41d4-a716-446655440009',
  companyId: '650e8400-e29b-41d4-a716-446655440010',
  createdDate: '2024-01-23T13:45:00.000Z',
  updatedDate: '2024-02-01T09:30:00.000Z',
  name: 'PP-123-3321',
  description: 'Flexible EVA compound optimized for medical-grade extrusion.',
  material: {
    type: 'eva',
    color: 'black',
    condition: 'regrind',
    certification: 'GRS',
    contamination: '< 1%',
    meltFlowIndex: '12 g/10 min',
    bulkDensity: '0.45 g/cm³',
    moistureContent: '0.2%',
    odor: 'neutral',
    packaging: 'Big bags',
  },
  price: { amount: 210, currency: 'EUR' },
  amount: 1200,
  documents: null,
  pictures: null,
  location: { country: 'IT' },
};

const pictures = [
  'https://picsum.photos/seed/800/600/600',
  'https://picsum.photos/seed/801/600/600',
  'https://picsum.photos/seed/802/600/600',
  'https://picsum.photos/seed/803/600/600',
  'https://picsum.photos/seed/804/600/600',
  'https://picsum.photos/seed/805/600/600',
  'https://picsum.photos/seed/806/600/600',
  'https://picsum.photos/seed/807/600/600',
];

const pdfDocuments = [
  'https://assets.staging.cirplus.com/catalog/PP-0210-13.pdf',
  'https://assets.staging.cirplus.com/catalog/PP-0210-13.pdf',
  'https://assets.staging.cirplus.com/catalog/PP-0210-13.pdf',
];

const formatPrice = (amount: number, currency: string): string => {
  const value = amount / 100;

  if (currency === 'JPY') {
    return `¥${Math.round(value).toLocaleString()}`;
  }

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CHF: 'CHF',
    CNY: '¥',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${value.toFixed(2)}`;
};

const humanizeKey = (key: string) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatPropertyValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '—';
  }

  if (typeof value === 'string') {
    return humanizeKey(value);
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(formatPropertyValue).join(', ');
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);

    if (
      entries.length === 2 &&
      entries.some(([key]) => key === 'min') &&
      entries.some(([key]) => key === 'max')
    ) {
      const min = (value as { min?: unknown }).min ?? '—';
      const max = (value as { max?: unknown }).max ?? '—';
      return `${min} – ${max}`;
    }

    return entries
      .map(
        ([nestedKey, nestedValue]) =>
          `${humanizeKey(nestedKey)}: ${formatPropertyValue(nestedValue)}`,
      )
      .join(', ');
  }

  return String(value);
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
  </div>
);

export const MaterialDetailsCard: FC<{ material: { name: string } }> = ({
  material: input,
}) => {
  const materialProperties = Object.entries(material.material).map(
    ([key, value]) => ({
      label: humanizeKey(key),
      value: formatPropertyValue(value),
    }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">
          {input.name}
        </CardTitle>
        <CardDescription>
          Listed {formatDate(material.createdDate)} • Last updated{' '}
          {formatDate(material.updatedDate)}
        </CardDescription>
        <CardAction>
          <Badge className="px-3 py-1.5 text-sm">
            {material.material.type.toUpperCase()}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-12 pb-12">
        <p className="leading-relaxed text-slate-900">{material.description}</p>
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Price / kg"
              value={formatPrice(
                material.price.amount,
                material.price.currency,
              )}
            />
            <Stat
              label="Available"
              value={`${material.amount.toLocaleString()} t`}
            />
            <Stat label="Company" value="cirplus GmbH" />
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Location
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900 flex items-center gap-3">
                <CircleFlag
                  countryCode={material.location.country.toLowerCase()}
                  height="20"
                  width="20"
                />
                Italy
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              Material Properties
            </h3>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-300">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <tbody className="divide-y divide-slate-300 bg-white">
                {materialProperties.map(({ label, value }) => (
                  <tr key={label}>
                    <th className="w-1/3 whitespace-nowrap bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      {label}
                    </th>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              Documents
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pdfDocuments.map((document, index) => (
              <a
                key={`${document}-${index}`}
                href={document}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <FileText className="size-4" aria-hidden />
                  </span>
                  Datasheet #{index + 1}
                </span>
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  PDF
                </span>
              </a>
            ))}
          </div>
        </section>
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              Pictures
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pictures.map((picture, index) => (
              <ImageZoom
                key={picture}
                className="block"
                backdropClassName={cn(
                  '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80',
                )}
              >
                <figure className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
                  <Image
                    src={picture}
                    unoptimized
                    alt={`Material preview ${index + 1}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-200 group-hover:scale-105"
                  />
                </figure>
              </ImageZoom>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
