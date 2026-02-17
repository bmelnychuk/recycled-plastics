import { Company } from '@rp/core';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/design-system/components/ui/card';
import { Separator } from '@/design-system/components/ui/separator';
import { ExternalLink, Globe, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { CompanyLogo } from '../../composite/company/CompanyLogo';
import { Button } from '@/design-system/components/ui/button';
import { CountryName } from '../common/CountryName';
import { FC, ReactNode } from 'react';


interface CompanyBusinessCardProps {
  company: Company;
  action?: ReactNode;
}

export const CompanyBusinessCard: FC<CompanyBusinessCardProps> = ({ company, action }) => {
  return (
    <Card className="backdrop-blur-sm min-w-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3">
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

      <CardContent>
        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="break-all">{company.email}</span>
          </a>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="break-all">{company.website}</span>
            </a>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <CountryName countryCode={company.address.country} />
          </div>

          <Separator className="my-2" />

          <div className="min-w-0">
            <p className="text-base font-semibold">
              {company.mainContact.firstName} {company.mainContact.lastName}
            </p>
            {company.mainContact.title && (
              <p className="text-xs text-muted-foreground">
                {company.mainContact.title}
              </p>
            )}
          </div>

          <a
            href={`mailto:${company.mainContact.email}`}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="break-all">{company.mainContact.email}</span>
          </a>

          {company.mainContact.phone && (
            <a
              href={`tel:${company.mainContact.phone}`}
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{company.mainContact.phone}</span>
            </a>
          )}
        </div>
      </CardContent>
      {action && (
        <CardFooter className="flex justify-end">
          {action}
        </CardFooter>
      )}
    </Card>
  );
};
