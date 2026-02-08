'use client';

import { FC } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table as TanStackTable } from '@tanstack/react-table';
import { DemandViewModel, SupplyViewModel } from '@rp/core';
import { DataTable } from '@/design-system/custom/data-table';
import { ColorPreview } from '../../features/material/MaterialColor';
import { formatPrice } from '@/composite/common/price-utils';
import { CircleFlag } from 'react-circle-flags';
import Link from 'next/link';
import { formatDate } from '@/composite/common/date-utils';
import {
  DemandBadge,
  SupplyBadge,
} from '../../features/material/MaterialSideBatch';
import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/design-system/components/ui/input-group';

type Material =
  | (SupplyViewModel & { side: 'supply' })
  | (DemandViewModel & { side: 'demand' });

const columns: ColumnDef<Material>[] = [
  {
    id: 'search',
    header: () => null,
    cell: () => null,
    size: 0,
    accessorFn: (row) =>
      `${row.material.type ?? ''} ${row.description ?? ''} ${row.company?.name ?? ''} ${row.location.country ?? ''}`.toLowerCase(),
    filterFn: (row, columnId, filterValue) => {
      const searchable = (row.getValue(columnId) as string) ?? '';
      return searchable.includes((filterValue as string).toLowerCase());
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdDate',
    header: 'Date',
    accessorFn: ({ createdDate }) => formatDate(createdDate),
    size: 100,
  },
  {
    id: 'type',
    header: 'Type',
    size: 150,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 uppercase">
        <ColorPreview color={row.original.material.color} />
        <Link
          href={`/companies/${row.original.companyId}/${row.original.side}/${row.original.id}/edit`}
          className="underline"
        >
          {row.original.material.type}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 250,
    cell: ({ row }) => (
      <div className="line-clamp-2 whitespace-normal wrap-break-word max-w-xs">
        {row.original.description}
      </div>
    ),
  },
  {
    id: 'price',
    header: 'Price',
    size: 100,
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    id: 'company',
    header: 'Company',
    size: 200,
    cell: ({ row }) => (
      <div
        className="flex items-center gap-2 min-h-10"
        onClick={(e) => e.stopPropagation()}
      >
        <CircleFlag
          countryCode={row.original.location.country.toLowerCase()}
          height="18"
          width="18"
        />
        <span className="truncate max-w-[200px]">
          <Link
            href={`/companies/${row.original.companyId}`}
            className="underline"
          >
            {row.original.company?.name}
          </Link>
        </span>
      </div>
    ),
  },
  {
    id: 'side',
    header: 'Side',
    size: 80,
    cell: ({ row }) =>
      row.original.side === 'demand' ? <DemandBadge /> : <SupplyBadge />,
  },
];

const getFilterValue = (
  table: TanStackTable<Material>,
  columnId: string,
): string | undefined => {
  return table.getColumn(columnId)?.getFilterValue() as string | undefined;
};

const setFilterValue = (
  table: TanStackTable<Material>,
  columnId: string,
  value: string,
): void => {
  table.getColumn(columnId)?.setFilterValue(value);
};

export const MaterialsTable: FC<{ materials: Material[] }> = ({
  materials,
}) => {
  return (
    <DataTable
      columns={columns}
      data={materials}
      enableMultiSort={false}
      header={(table) => (
        <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-3 rounded-lg justify-between">
          <div className="flex items-center gap-2">
            <div className="w-100">
              <InputGroup className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                <InputGroupInput
                  placeholder="Search"
                  value={getFilterValue(table, 'search') || ''}
                  onChange={(e) =>
                    setFilterValue(table, 'search', e.target.value)
                  }
                />
                <InputGroupAddon className="text-muted-foreground">
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>
      )}
    />
  );
};
