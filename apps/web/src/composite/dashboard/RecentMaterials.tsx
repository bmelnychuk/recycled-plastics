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
import { DemandViewModel, SignedInUser, SupplyViewModel } from '@rp/core';

export const RecentMaterials: FC<{
  user?: SignedInUser;
  supply: SupplyViewModel[];
  demand: DemandViewModel[];
}> = ({ supply, demand, user }) => {
  const canAdd = Boolean(user?.isCompanyVerified || user?.isAdmin);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Latest materials</CardTitle>
        <CardDescription>
          Supply and demand for the latest materials
        </CardDescription>
        <CardAction>
          {canAdd ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus />
                  New material
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
                  <Button disabled>
                    <Plus />
                    New material
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign up and verify your company to add a new material</p>
              </TooltipContent>
            </Tooltip>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <MaterialsTable
          materials={[
            ...supply.map((s) => ({ ...s, side: 'supply' as const })),
            ...demand.map((d) => ({ ...d, side: 'demand' as const })),
          ]
            .sort((a, b) => b.createdDate.localeCompare(a.createdDate))
            .slice(0, 35)}
        />
      </CardContent>
    </Card>
  );
};

type Material =
  | (SupplyViewModel & { side: 'supply' })
  | (DemandViewModel & { side: 'demand' });

const MaterialsTable: FC<{ materials: Material[] }> = ({ materials }) => {
  return (
    <div className="flex flex-col gap-1">
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
                    <Link
                      href={`/companies/${material.companyId}`}
                      className="underline"
                    >
                      {material.company?.name}
                    </Link>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {material.side === 'demand' ? <DemandBadge /> : <SupplyBadge />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
