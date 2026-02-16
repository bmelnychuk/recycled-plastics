'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { FC } from 'react';

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/design-system/components/ui/table';
import { Table } from '@/design-system/components/ui/table';
import { ColorPreview } from '../../features/material/MaterialColor';
import { formatPrice } from '../common/price-utils';
import { CircleFlag } from 'react-circle-flags';
import Link from 'next/link';
import { formatDate } from '../common/date-utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import { Button } from '@/design-system/components/ui/button';
import { Plus } from 'lucide-react';

import { DemandSheetButton } from '../../features/demand/DemandSheetButton';
import {
  DemandBadge,
  SupplyBadge,
} from '../../features/material/MaterialSideBatch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/design-system/components/ui/tooltip';
import { SupplySheetButton } from '@/features/supply/SupplySheetButton';
import { CompanySheetButton } from '@/features/company/CompanySheetButton';
import { generateBlurredName } from '@/lib/random';
import { DemandViewModel, SignedInUser, SupplyViewModel } from '@rp/core';

export const RecentMaterials: FC<{
  user?: SignedInUser;
  supply: SupplyViewModel[];
  demand: DemandViewModel[];
}> = ({ supply, demand, user }) => {
  const canAdd = Boolean(user?.isCompanyVerified || user?.isAdmin);

  const materials = [
    ...supply.map((s) => ({ ...s, side: 'supply' as const })),
    ...demand.map((d) => ({ ...d, side: 'demand' as const })),
  ]
    .sort((a, b) => b.createdDate.localeCompare(a.createdDate))
    .slice(0, 35);

  const headerAction = canAdd ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="shrink-0 md:h-9 md:w-auto md:px-4 md:py-2"
          aria-label="New material"
        >
          <Plus />
          <span className="hidden md:inline">New material</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" side="bottom" align="end">
        <DropdownMenuItem>
          <Link
            href={
              user?.isAdmin
                ? '/admin/supply/new'
                : `/companies/${user?.companyId}/supply/new`
            }
          >
            Create material entry
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={
              user?.isAdmin
                ? '/admin/demand/new'
                : `/companies/${user?.companyId}/demand/new`
            }
          >
            Create request
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button
            size="icon"
            className="shrink-0 md:h-9 md:w-auto md:px-4 md:py-2"
            disabled
            aria-label="New material"
          >
            <Plus />
            <span className="hidden md:inline">New material</span>
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Sign up and verify your company to add a new material</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <>
      {/* Mobile: plain div root */}
      <div className="flex flex-col h-full md:hidden">
        <div className="flex items-start justify-between gap-4 pt-6 pb-4">
          <div className="py-3 -my-3">
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Latest materials
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5">
              Supply and demand for the latest materials
            </p>
          </div>
          {headerAction}
        </div>
        <MaterialsTable materials={materials} />
      </div>
      {/* Desktop: card root */}
      <Card className="hidden flex-col h-full md:flex">
        <CardHeader>
          <CardTitle>Latest materials</CardTitle>
          <CardDescription>
            Supply and demand for the latest materials
          </CardDescription>
          <CardAction>{headerAction}</CardAction>
        </CardHeader>
        <CardContent>
          <MaterialsTable materials={materials} />
        </CardContent>
      </Card>
    </>
  );
};

type Material =
  | (SupplyViewModel & { side: 'supply' })
  | (DemandViewModel & { side: 'demand' });

const MaterialCard: FC<{ material: Material }> = ({ material }) => (
  <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
    <div className="flex min-w-0 flex-col gap-1.5">
      {/* Top row: type left, supply|demand badge top right */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <ColorPreview color={material.material.color} />
          {material.side === 'supply' ? (
            <SupplySheetButton supply={material} />
          ) : (
            <DemandSheetButton demand={material} />
          )}
        </div>
        {material.side === 'demand' ? <DemandBadge /> : <SupplyBadge />}
      </div>
      <p className="line-clamp-2 text-sm">{material.description}</p>
      {/* Company on its own row */}
      <div className="flex items-center gap-1.5 py-1 text-xs text-muted-foreground">
        <CircleFlag
          countryCode={material.location.country.toLowerCase()}
          height="14"
          width="14"
        />
        {material.company ? (
          <CompanySheetButton company={material.company} />
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="blur-[5px]">
                {generateBlurredName(material.id)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sign up to view company details</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {/* Last row: price left, date right */}
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {formatPrice(material.price)}
        </span>
        <span>{formatDate(material.createdDate)}</span>
      </div>
    </div>
  </div>
);

const MaterialsTable: FC<{ materials: Material[] }> = ({ materials }) => {
  return (
    <>
      {/* Mobile: compact cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
      {/* Desktop: table */}
      <div className="hidden flex-col gap-1 md:flex">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Country</TableHead>
              <TableHead className="font-bold">Side</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{formatDate(material.createdDate)}</TableCell>
                <TableCell className="uppercase min-w-16">
                  <div className="flex items-center gap-2">
                    <ColorPreview color={material.material.color} />
                    {material.side === 'supply' ? (
                      <SupplySheetButton supply={material} />
                    ) : (
                      <DemandSheetButton demand={material} />
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="line-clamp-2 whitespace-normal wrap-break-word">
                    {material.description}
                  </div>
                </TableCell>
                <TableCell>{formatPrice(material.price)}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2 min-h-10">
                    <CircleFlag
                      countryCode={material.location.country.toLowerCase()}
                      height="18"
                      width="18"
                    />
                    <span className="truncate max-w-[200px]">
                      {material.company ? (
                        <CompanySheetButton company={material.company} />
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="blur-[5px]">
                              {generateBlurredName(material.id)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sign up to view company details</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {material.side === 'demand' ? (
                    <DemandBadge />
                  ) : (
                    <SupplyBadge />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
