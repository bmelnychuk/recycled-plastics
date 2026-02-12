import { Company } from '@rp/core';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/design-system/components/ui/card';
import { ExternalLink, Globe, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { countries } from 'country-data-list';
import { CompanyLogo } from '../../composite/company/CompanyLogo';
import { Button } from '@/design-system/components/ui/button';

export const CompanyBusinessCard = ({ company }: { company: Company }) => {
  const country = company.address.country;

  // @ts-ignore
  const countryName = country ? countries[country]?.name : country;

  return (
    <Card className="backdrop-blur-sm min-w-100 h-full">
      <CardHeader className="flex flex-row items-center gap-3 pb-4">
        <CompanyLogo
          logo={company.branding?.logo}
          name={company.name}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold tracking-tight">
            {company.name}
          </h3>
          {company.industry && (
            <p className="text-sm text-muted-foreground font-medium">
              {company.industry}
            </p>
          )}
        </div>
        <CardAction>
          <Link href={`/companies/${company.id}`} target="_blank">
            <Button variant="ghost">
              <ExternalLink />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2.5">
        <a
          href={`mailto:${company.email}`}
          className="flex items-center gap-2 text-sm hover:underline"
        >
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="break-all pr-2">{company.email}</span>
        </a>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="break-all pr-2">{company.website}</span>
          </a>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{countryName}</span>
        </div>
      </CardContent>
    </Card>
  );
};
