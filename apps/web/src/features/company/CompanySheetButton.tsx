import { Company } from "@/backend";
import { FC, useState } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import {
  ExternalLink,
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/design-system/components/ui/sheet";
import { CompanyLogo } from "@/composite/company/CompanyLogo";
import { defaultColor } from "@/composite/form/CompanyColorSelect";
import { CircleFlag } from "react-circle-flags";
import { CountryName } from "../common/CountryName";

export const CompanySheetButton: FC<{ company: Company }> = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false);

  const countryCode = company.address.country;


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="underline hover:text-primary transition-colors cursor-pointer"
      >
        {" "}
        {company.name}
      </button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          className="w-full sm:max-w-lg flex flex-col p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex-1 overflow-y-auto gap-4 flex flex-col">
            <div
              className="flex flex-col items-start gap-4 px-4 py-5"
              style={{
                backgroundColor: company.branding?.primaryColor || defaultColor,
              }}
            >
              <SheetHeader className="p-0">
                <SheetTitle />
              </SheetHeader>
              <div className="flex items-center gap-4">
                <CompanyLogo
                  logo={company.branding?.logo}
                  name={company.name}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold truncate">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{company.industry || " - "}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm leading-relaxed">{company.description}</p>
              </div>
            </div>
            <div className="flex flex-col px-6 py-2 gap-4">
              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Contact Information
                </h4>

                {/* Website */}
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Website
                    </div>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate block"
                      >
                        {company.website}
                      </a>
                    ) : (
                      <div className="text-muted-foreground"> - </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Email
                    </div>
                    {company.email ? (
                      <a
                        href={`mailto:${company.email}`}
                        className="text-primary hover:underline truncate block"
                      >
                        {company.email}
                      </a>
                    ) : (
                      <div className="text-muted-foreground"> - </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Phone
                    </div>
                    {company.phone ? (
                      <a
                        href={`tel:${company.phone}`}
                        className="text-primary hover:underline"
                      >
                        {company.phone}
                      </a>
                    ) : (
                      <div className="text-muted-foreground"> - </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Location
                </h4>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Address
                    </div>
                    {company.address ? (
                      <div className="space-y-0.5">
                        <div>{company.address.street}</div>
                        <div>
                          {company.address.zipCode} {company.address.city}
                        </div>
                        <div className="flex items-center gap-2">
                          <div><CountryName countryCode={company.address.country} /></div>
                          <CircleFlag
                            countryCode={countryCode.toLowerCase()}
                            height="16"
                            width="16"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground"> - </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Member Since
                    </div>
                    <div className="font-medium">
                      {new Date(company.createdDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="p-6 border-t">
            <Button asChild className="w-full">
              <Link href={`/companies/${company.id}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Details
              </Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
