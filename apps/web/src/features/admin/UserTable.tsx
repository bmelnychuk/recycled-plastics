'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SignedInUser, User } from '@rp/core';
import { DataTable } from '../../design-system/custom/data-table';
import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/design-system/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Table as TanStackTable } from '@tanstack/react-table';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/design-system/components/ui/input-group';
import { formatDate } from '../../composite/common/date-utils';

const allColumns: ColumnDef<User>[] = [
  {
    id: 'search',
    header: () => null,
    cell: () => null,
    size: 0,
    accessorFn: ({ firstName, lastName, email }) =>
      `${firstName} ${lastName} ${email}`.toLowerCase(),
    filterFn: (row, columnId, filterValue) => {
      const searchable = (row.getValue(columnId) as string) ?? '';
      return searchable.includes((filterValue as string).toLowerCase());
    },
    enableSorting: false,
  },
  // {
  //   id: 'name_link',
  //   header: 'Name',
  //   accessorFn: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  //   size: 180,
  //   cell: ({ row }) => (
  //     <div className="h-12 flex items-center">
  //       <Link
  //         href={`/admin/users/${row.original.id}/edit`}
  //         className="underline"
  //       >
  //         {row.original.firstName} {row.original.lastName}
  //       </Link>
  //     </div>
  //   ),
  // },
  {
    id: 'name_text',
    header: 'Name',
    accessorFn: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    size: 180,
    cell: ({ row }) => (
      <div className="h-12 flex items-center">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
];

// const userColumns = allColumns.filter(({ id }) => id !== 'name_link');
// const adminColumns = allColumns.filter(({ id }) => id !== 'name_text');

const getFilterValue = (
  table: TanStackTable<User>,
  columnId: string,
): string | undefined => {
  return table.getColumn(columnId)?.getFilterValue() as string | undefined;
};

const setFilterValue = (
  table: TanStackTable<User>,
  columnId: string,
  value: string,
): void => {
  table.getColumn(columnId)?.setFilterValue(value);
};

export const CompanyUserTable: FC<{
  user: SignedInUser;
  users: User[];
  companyId: string;
}> = ({ user, users, companyId }) => {
  return (
    <UserTable
      users={users}
      columns={allColumns}
      companyId={companyId}
      user={user}
    />
  );
};

const UserTable: FC<{
  users: User[];
  columns: ColumnDef<User>[];
  companyId?: string;
  user: SignedInUser;
}> = ({ users, columns, companyId, user }) => {
  return (
    <DataTable
      columns={columns}
      data={users}
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
          {user.isAdmin && (
            <Button asChild>
              <Link href={`/admin/users/new?companyId=${companyId}`}>
                <Plus />
                New user
              </Link>
            </Button>
          )}
        </div>
      )}
    />
  );
};
