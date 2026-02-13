'use client';

import { Company } from '@rp/core';
import { generateColorShades } from '../common/color-utils';
import { Globe, Mail, MapPin, Phone, VerifiedIcon } from 'lucide-react';
import { countries } from 'country-data-list';
import { formatWebsite } from '../common/format-utils';
import { ContactBusinessCard } from './ContactBusinessCard';
import { CompanyLogo } from './CompanyLogo';
import { getColorValue } from '../form/CompanyColors';

interface CompanyBrandedHeaderProps {
  company: Company;
}

export const CompanyBrandedHeader = ({
  company,
}: CompanyBrandedHeaderProps) => {
  const primaryColor = getColorValue(company.branding?.primaryColor);

  const countryCode = company.address.country;

  return (
    <div
      className="relative min-w-0 overflow-hidden"
      style={{
        background: primaryColor,
      }}
    >
      <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:py-10 min-w-0">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start min-w-0">
          {/* Left Section: Company Info */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-3 sm:gap-4">
            {/* Top Section: Logo and Company Name with Data */}
            <div className="flex items-start gap-3 sm:gap-5 min-w-0">
              {/* Logo */}
              <CompanyLogo
                logo={company.branding?.logo}
                name={company.name}
                size="md"
              />

              {/* Company Name and Industry */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold mb-1 wrap-break-word">
                  {company.name} {!company.verified ? '(Unverified)' : ''}
                </h1>
                <p className="text-sm opacity-75">{company.industry}</p>
              </div>
            </div>

            {/* Company Details - Stack on mobile, inline on larger screens */}
            <div className="min-w-0 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-x-4 sm:gap-y-2 text-sm">
              {company.website && (
                <>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:underline break-all"
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span className="break-all">
                      {formatWebsite(company.website)}
                    </span>
                  </a>
                  <span className="opacity-30 hidden sm:inline">•</span>
                </>
              )}

              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-1.5 hover:underline break-all"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="break-all">{company.email}</span>
              </a>

              {company.phone && (
                <>
                  <span className="opacity-30 hidden sm:inline">•</span>

                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span>{company.phone}</span>
                  </a>
                </>
              )}

              <span className="opacity-30 hidden sm:inline">•</span>

              <div className="flex items-start sm:items-center gap-1.5 min-w-0">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 sm:mt-0" />
                <span className="wrap-break-word">
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

            <p className="text-sm sm:text-base opacity-90 max-w-3xl wrap-break-word">
              {company.description}
            </p>
          </div>

          {company.mainContact && (
            <div className="min-w-0 w-full lg:w-auto lg:min-w-100 lg:aspect-16/8 lg:shrink-0">
              <ContactBusinessCard user={company.mainContact} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
