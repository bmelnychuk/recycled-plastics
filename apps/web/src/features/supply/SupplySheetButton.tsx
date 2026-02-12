import { MaterialSupply } from '@rp/core';
import { FC, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/design-system/components/ui/button';
import { ExternalLink, FileText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/design-system/components/ui/sheet';
import { CircleFlag } from 'react-circle-flags';
import { PriceValue } from '@/features/common/PriceValue';
import Image from 'next/image';
import { ScrollArea } from '@/design-system/components/ui/scroll-area';
import { CountryName } from '../common/CountryName';
import {
  MaterialTypeLabel,
  MinMaxValueLabel,
} from '@/features/material/labels';
import { ColorLabel } from '../material/MaterialColor';
import { MaterialDataTable } from '../material/MaterialDataTable';

export const SupplySheetButton: FC<{ supply: MaterialSupply }> = ({
  supply,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const countryCode = supply.location.country;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="underline hover:text-primary transition-colors cursor-pointer"
      >
        {supply.material.type.toUpperCase()}
      </button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          className="w-full sm:max-w-xl flex flex-col p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-3">
                <SheetHeader className="px-4 pt-4">
                  <SheetTitle className="text-2xl font-semibold truncate">
                    {supply.name}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 px-4 pb-4 border-b">
                  {supply.description && (
                    <p className="leading-relaxed">{supply.description}</p>
                  )}
                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-3 gap-5">
                    {/* Material */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Material
                        </div>
                        <div className="font-semibold truncate">
                          <MaterialTypeLabel type={supply.material.type} />
                        </div>
                      </div>
                    </div>
                    {/* Color */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Color
                        </div>
                        <div className="font-semibold truncate">
                          <ColorLabel color={supply.material.color} />
                        </div>
                      </div>
                    </div>
                    {/* Viscosity */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Viscosity
                        </div>
                        <div className="font-semibold truncate">
                          <MinMaxValueLabel
                            value={supply.material.viscosity?.value}
                            fallback="-"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Price / kg
                        </div>
                        <div className="font-semibold truncate">
                          <PriceValue price={supply.price} />
                        </div>
                      </div>
                    </div>

                    {/* Available Amount */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Available
                        </div>
                        <div className="font-semibold truncate">
                          {supply.amount.toLocaleString()} t
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">
                          Location
                        </div>
                        <div className="font-semibold flex items-center gap-1.5 truncate">
                          <CircleFlag
                            countryCode={countryCode.toLowerCase()}
                            height="14"
                            width="14"
                          />
                          <span className="truncate">
                            <CountryName countryCode={countryCode} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Properties Table */}
                <div className="px-4 py-2">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Material Properties
                  </h4>
                  <MaterialDataTable material={supply.material} />
                </div>

                {/* Documents Section */}
                {supply.documents && supply.documents.length > 0 && (
                  <div className="px-4 py-2">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Documents
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {supply.documents.map((document) => (
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
                  </div>
                )}

                {/* Pictures Section */}
                {supply.pictures && supply.pictures.length > 0 && (
                  <div className="px-4 pb-6">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Pictures
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {supply.pictures.map((picture, index) => (
                        <a
                          key={picture.id}
                          href={picture.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted hover:shadow-md transition-shadow">
                            <Image
                              src={picture.url}
                              alt={`Material preview ${index + 1}`}
                              fill
                              unoptimized
                              sizes="(min-width: 640px) 33vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <SheetFooter className="p-6 border-t">
            <Button asChild className="w-full">
              <Link href={`/companies/${supply.companyId}/supply/${supply.id}`}>
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
