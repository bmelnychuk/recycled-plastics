'use client';

import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { MaterialTypeSelect } from '@/features/material/MaterialTypeSelect';
import {
  SupplyViewModel,
  MaterialType,
  MaterialColor,
  SignedInUser,
} from '@rp/core';
import { DataTable, SortableHeader } from '@/design-system/custom/data-table';
import { FC, ReactNode } from 'react';
import { ColorLabel, ColorPreview } from '@/features/material/MaterialColor';

import Link from 'next/link';
import { CircleFlag } from 'react-circle-flags';
import { CountryDropdown } from '@/features/common/CountryDropdown';
import { Button } from '@/design-system/components/ui/button';
import { Plus, Search, X } from 'lucide-react';
import { Table as TanStackTable } from '@tanstack/react-table';
import { ColorSelect } from '@/features/material/ColorSelect';
import Image from 'next/image';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/design-system/components/ui/input-group';
import { ImageZoom } from '@/design-system/components/ui/shadcn-io/image-zoom';
import { cn } from '@/design-system/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/design-system/components/ui/tooltip';
import { generateBlurredName } from '@/lib/random';
import { CompanySheetButton } from '@/features/company/CompanySheetButton';
import { SupplySheetButton } from '@/features/supply/SupplySheetButton';
import { SupplyTableMobile } from '@/features/supply/SupplyTableMobile';
import { PriceValue } from '@/features/common/PriceValue';

const allColumns: ColumnDef<SupplyViewModel>[] = [
  {
    id: 'preview',
    header: 'Preview',
    enableSorting: false,
    size: 80,
    cell: ({ row }) => {
      const image = row.original.pictures?.[0]?.url;
      if (!image) return null;

      return (
        <div onClick={(e) => e.stopPropagation()}>
          <ImageZoom
            backdropClassName={cn(
              '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80',
            )}
          >
            <Image
              className="p-1 rounded-lg"
              src={image}
              unoptimized
              alt={row.original.material.type}
              width={72}
              height={72}
            />
          </ImageZoom>
        </div>
      );
    },
  },
  {
    id: 'materialType',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Type"
        isSorted={column.getIsSorted()}
      />
    ),
    accessorFn: ({ material }) => material.type.toUpperCase(),
    filterFn: 'equalsString',
    size: 80,
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <SupplySheetButton supply={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'updatedDate',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Date"
        isSorted={column.getIsSorted()}
      />
    ),
    accessorFn: ({ updatedDate }) => format(updatedDate, 'dd/MM/yyyy'),
    size: 80,
  },
  {
    id: 'color',
    accessorKey: 'material.color',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Color"
        isSorted={column.getIsSorted()}
      />
    ),
    size: 100,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ColorPreview color={row.original.material.color} />
        <ColorLabel color={row.original.material.color} />
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    enableSorting: false,
    size: 300,
    cell: ({ row }) => (
      <div className="max-w-md">
        <div className="line-clamp-2 whitespace-normal wrap-break-word">
          {row.original.description}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Amount"
        isSorted={column.getIsSorted()}
      />
    ),
    size: 80,
    cell: ({ row }) => `${row.original.amount} t`,
  },
  {
    accessorKey: 'price.amount',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Price"
        isSorted={column.getIsSorted()}
      />
    ),
    size: 80,
    cell: ({ row }) => <PriceValue price={row.original.price} />,
  },
  {
    id: 'company',
    accessorKey: 'company.name',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Company"
        isSorted={column.getIsSorted()}
      />
    ),
    size: 180,
    cell: ({ row }) => {
      const company = row.original.company;

      return company ? (
        <div onClick={(e) => e.stopPropagation()}>
          <CompanySheetButton company={company} />
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="blur-[5px]">
              {generateBlurredName(row.original.id)}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign up to view company details</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    id: 'country',
    accessorKey: 'location.country',
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Country"
        isSorted={column.getIsSorted()}
      />
    ),
    filterFn: 'equalsString',
    size: 70,
    cell: ({ row }) => (
      <div className="h-12 flex align-middle">
        {row.original.location.country ? (
          <CircleFlag
            countryCode={row.original.location.country.toLowerCase()}
            height="24"
            width="24"
          />
        ) : null}
      </div>
    ),
  },
];

const companyColumns = allColumns.filter(({ id }) => id !== 'company');

const getFilterValue = <T,>(
  table: TanStackTable<SupplyViewModel>,
  columnId: string,
): T | undefined => {
  return table.getColumn(columnId)?.getFilterValue() as T | undefined;
};

const setFilterValue = <T,>(
  table: TanStackTable<SupplyViewModel>,
  columnId: string,
  value: T,
): void => {
  table.getColumn(columnId)?.setFilterValue(value);
};

export const CompanySupplyTable: FC<{
  supply: SupplyViewModel[];
  user: SignedInUser;
  companyId: string;
}> = ({ supply, user, companyId }) => {
  const callToAction =
    user?.isAdmin ||
    (user?.isCompanyVerified && companyId === user?.companyId) ? (
      <Button
        asChild
        size="icon"
        className="shrink-0 md:h-9 md:w-auto md:px-4 md:py-2"
        aria-label="Create material entry"
      >
        <Link
          href={
            companyId
              ? `/companies/${companyId}/supply/new`
              : '/admin/supply/new'
          }
          className="flex items-center justify-center md:gap-2"
        >
          <Plus />
          <span className="hidden md:inline">Create material entry</span>
        </Link>
      </Button>
    ) : null;

  return (
    <>
      <div className="md:hidden">
        <SupplyTableMobile
          supply={supply}
          callToAction={callToAction}
          hideCompany
        />
      </div>
      <div className="hidden md:block">
        <SupplyTable
          supply={supply}
          callToAction={callToAction}
          columns={companyColumns}
        />
      </div>
    </>
  );
};

export const ActiveSupplyTable: FC<{
  supply: SupplyViewModel[];
  user?: SignedInUser;
}> = ({ supply, user }) => {
  const hasCompany = user?.companyId && user?.isCompanyVerified;
  const isAdmin = user?.isAdmin;
  const canAdd = isAdmin || hasCompany;

  const createHref = isAdmin
    ? '/admin/supply/new'
    : user?.companyId
      ? `/companies/${user.companyId}/supply/new`
      : '#';

  const callToAction = canAdd ? (
    <Button
      asChild
      size="icon"
      className="shrink-0 md:h-9 md:w-auto md:px-4 md:py-2"
      aria-label="Create material entry"
    >
      <Link
        href={createHref}
        className="flex items-center justify-center md:gap-2"
      >
        <Plus />
        <span className="hidden md:inline">Create material entry</span>
      </Link>
    </Button>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button
            size="icon"
            className="shrink-0 md:h-9 md:w-auto md:px-4 md:py-2"
            disabled
            aria-label="Create material entry"
          >
            <Plus />
            <span className="hidden md:inline">Create material entry</span>
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
      <div className="md:hidden">
        <SupplyTableMobile supply={supply} callToAction={callToAction} />
      </div>
      <div className="hidden md:block">
        <SupplyTable
          supply={supply}
          callToAction={callToAction}
          columns={allColumns}
        />
      </div>
    </>
  );
};

const SupplyTable: FC<{
  supply: SupplyViewModel[];
  columns: ColumnDef<SupplyViewModel>[];
  callToAction: ReactNode | null;
}> = ({ supply, columns, callToAction }) => {
  const { typeOptions, colorOptions, countryOptions } = supply.reduce(
    (acc, s) => {
      acc.typeOptions.add(s.material.type);
      acc.colorOptions.add(s.material.color);
      if (s.location.country) acc.countryOptions.add(s.location.country);
      return acc;
    },
    {
      typeOptions: new Set<MaterialType>(),
      colorOptions: new Set<MaterialColor>(),
      countryOptions: new Set<string>(),
    },
  );

  return (
    <DataTable
      columns={columns}
      data={supply}
      enableMultiSort={false}
      header={(table) => (
        <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-3 rounded-lg justify-between">
          <div className="flex items-center gap-2">
            <div className="w-50">
              <MaterialTypeSelect
                options={Array.from(typeOptions)}
                value={getFilterValue(table, 'materialType')}
                onChange={(v) => setFilterValue(table, 'materialType', v)}
              />
            </div>
            <div className="w-50">
              <ColorSelect
                options={Array.from(colorOptions)}
                value={getFilterValue(table, 'color')}
                onChange={(v) => setFilterValue(table, 'color', v)}
              />
            </div>
            <div className="w-70">
              <CountryDropdown
                options={Array.from(countryOptions)}
                value={getFilterValue(table, 'country')}
                onChange={(v) => setFilterValue(table, 'country', v)}
              />
            </div>
            <div className="w-100">
              <InputGroup className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                <InputGroupInput
                  placeholder="Search"
                  value={getFilterValue(table, 'description') || ''}
                  onChange={(e) =>
                    setFilterValue(table, 'description', e.target.value)
                  }
                />
                <InputGroupAddon className="text-muted-foreground">
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>
            {table.getState().columnFilters.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  table.resetColumnFilters();
                }}
              >
                <X />
                Clear filters
              </Button>
            )}
          </div>
          {callToAction}
        </div>
      )}
    />
  );
};
