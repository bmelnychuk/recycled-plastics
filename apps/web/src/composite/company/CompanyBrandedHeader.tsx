'use client';

import { Company } from '@rp/core';
import { generateColorShades } from '../common/color-utils';
import { Globe, Mail, MapPin, Phone, VerifiedIcon } from 'lucide-react';
import { countries } from 'country-data-list';
import { formatWebsite } from '../common/format-utils';
import { ContactBusinessCard } from './ContactBusinessCard';
import { CompanyLogo } from './CompanyLogo';
import { defaultColor } from '../form/CompanyColorSelect';

interface CompanyBrandedHeaderProps {
  company: Company;
}

export const CompanyBrandedHeader = ({
  company,
}: CompanyBrandedHeaderProps) => {
  const primaryColor = company.branding?.primaryColor ?? defaultColor;
  const colors = generateColorShades(primaryColor);
  const countryCode = company.address.country;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${colors?.[700]} 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Section: Company Info */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Top Section: Logo and Company Name with Data */}
            <div className="flex items-start gap-5">
              {/* Logo */}
              <CompanyLogo
                logo={company.branding?.logo}
                name={company.name}
                size="md"
              />

              {/* Company Name and Industry */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold mb-1">
                  {company.name} {!company.verified ? '(Unverified)' : ''}
                </h1>
                <p className="text-sm opacity-75">{company.industry}</p>
              </div>
            </div>

            {/* Company Details - Inline */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {company.website && (
                <>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{formatWebsite(company.website)}</span>
                  </a>
                  <span className="opacity-30">•</span>
                </>
              )}

              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{company.email}</span>
              </a>

              {company.phone && (
                <>
                  <span className="opacity-30">•</span>

                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{company.phone}</span>
                  </a>
                </>
              )}

              <span className="opacity-30">•</span>

              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span>
                  {[
                    company.address.street,
                    company.address.city,
                    company.address.zipCode,
                    // @ts-ignore
                    countries[countryCode]?.name || countryCode,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
            </div>

            <p className="text-md opacity-90 max-w-3xl">
              {company.description}
            </p>
          </div>

          {company.mainContact && (
            <div className="aspect-16/8 min-w-100">
              <ContactBusinessCard user={company.mainContact} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
