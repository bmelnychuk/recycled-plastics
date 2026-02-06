"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Table as TanStackTable } from "@tanstack/react-table";
import { Company } from "@/backend";
import { DataTable } from "@/design-system/custom/data-table";
import { FC } from "react";
import Link from "next/link";
import { CircleFlag } from "react-circle-flags";
import { formatDate } from "../../composite/common/date-utils";
import { Button } from "@/design-system/components/ui/button";
import { Toggle } from "@/design-system/components/ui/toggle";
import { CheckCircle, Circle, Plus, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/design-system/components/ui/input-group";

const columns: ColumnDef<Company>[] = [
  {
    id: "search",
    header: () => null,
    cell: () => null,
    size: 0,
    accessorFn: (row) =>
      `${row.name} ${row.email ?? ""} ${row.industry ?? ""} ${row.address.country ?? ""}`.toLowerCase(),
    filterFn: (row, columnId, filterValue) => {
      const searchable = (row.getValue(columnId) as string) ?? "";
      return searchable.includes((filterValue as string).toLowerCase());
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Company",
    size: 200,
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Link href={`/admin/companies/${row.original.id}/edit`} className="underline">
          {row.original.name}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "createdDate",
    header: "Created date",
    accessorFn: ({ createdDate }) => formatDate(createdDate),
    size: 120,
  },
  {
    accessorKey: "verified",
    header: "Verified",
    size: 100,
    cell: ({ row }) => (
      <div className="h-12 flex items-center">
        {row.original.verified
          ? <CheckCircle className="w-4 h-4 text-green-500" />
          : <Circle className="w-4 h-4 text-gray-500" />
        }
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.original.verified === false;
    },
  },
  {
    accessorKey: "industry",
    header: "Industry",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "website",
    header: "Website",
    size: 200,
    cell: ({ row }) =>
      row.original.website ? (
        <Link href={row.original.website} className="underline" target="_blank">
          {row.original.website}
        </Link>
      ) : null,
  },
  {
    id: "country",
    accessorKey: "location.country",
    header: "Country",
    size: 80,
    cell: ({ row }) => (
      <div className="h-12 flex items-center">
        {row.original.address.country ? (
          <CircleFlag
            countryCode={row.original.address.country.toLowerCase()}
            height="24"
            width="24"
          />
        ) : null}
      </div>
    ),
  },
];

const getFilterValue = (
  table: TanStackTable<Company>,
  columnId: string
): string | undefined => {
  return table.getColumn(columnId)?.getFilterValue() as string | undefined;
};

const setFilterValue = (
  table: TanStackTable<Company>,
  columnId: string,
  value: string
): void => {
  table.getColumn(columnId)?.setFilterValue(value);
};

export const CompaniesTable: FC<{ companies: Company[] }> = ({
  companies,
}) => {
  return (
    <DataTable
      columns={columns}
      data={companies}
      enableMultiSort={false}
      header={(table) => (
        <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-3 rounded-lg justify-between">
          <div className="flex items-center gap-2">
            <div className="w-100">
              <InputGroup className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                <InputGroupInput
                  placeholder="Search"
                  value={getFilterValue(table, "search") || ""}
                  onChange={(e) =>
                    setFilterValue(table, "search", e.target.value)
                  }
                />
                <InputGroupAddon className="text-muted-foreground">
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Toggle
              variant="outline"
              className="bg-background data-[state=on]:bg-background"
              pressed={!!table.getColumn("verified")?.getFilterValue()}
              onPressedChange={(pressed) =>
                table.getColumn("verified")?.setFilterValue(pressed || undefined)
              }
            >
              {table.getColumn("verified")?.getFilterValue() ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Show all
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Show unverified
                </>
              )}
            </Toggle>
          </div>
          <Button asChild>
            <Link href="/admin/companies/new">
              <Plus />
              New Company
            </Link>
          </Button>
        </div>
      )}
    />
  );
};
