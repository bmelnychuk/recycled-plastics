"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReducedUser } from "@/backend";
import { DataTable } from "@/design-system/custom/data-table";
import { FC } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import { CheckCircle, Circle, CircleDashed, Plus, Search, XCircle } from "lucide-react";
import { Table as TanStackTable } from "@tanstack/react-table";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/design-system/components/ui/input-group";
import { formatDate } from "../../composite/common/date-utils";
import { CompanyVerificationIcon } from "../company/CompanyVerificationIcon";

const allColumns: ColumnDef<ReducedUser>[] = [
    {
        id: "search",
        header: () => null,
        cell: () => null,
        size: 0,
        accessorFn: (row) =>
            `${row.email} ${row.firstName} ${row.lastName} ${row.company?.name ?? ""}`.toLowerCase(),
        filterFn: (row, columnId, filterValue) => {
            const searchable = (row.getValue(columnId) as string) ?? "";
            return searchable.includes((filterValue as string).toLowerCase());
        },
        enableSorting: false,
    },
    {
        id: "name",
        header: "Name",
        accessorFn: ({ firstName, lastName }) => `${firstName} ${lastName}`,
        size: 180,
        cell: ({ row }) => (
            <div className="h-12 flex items-center">
                <Link
                    href={`/admin/users/${row.original.id}/edit`}
                    className="underline"
                >
                    {row.original.firstName} {row.original.lastName}
                </Link>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        size: 200,
        cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
        id: "company",
        accessorKey: "company.name",
        header: "Company",
        size: 200,
        cell: ({ row }) => {
            const company = row.original.company;

            return company ? (
                <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-3">
                    <CompanyVerificationIcon verified={company.verified} />
                    <Link
                        href={`/companies/${row.original.company?.id}`}
                        className="underline"
                    >
                        {company.name}
                    </Link>
                </div>
            ) : (
                <span className="text-muted-foreground">-</span>
            );
        },
    },
    {
        accessorKey: "plan",
        header: "Plan",
        size: 100,
        cell: ({ row }) => <div className="capitalize">{row.original.plan}</div>,
    },
    {
        accessorKey: "updatedDate",
        header: "Updated",
        accessorFn: ({ updatedDate }) => formatDate(updatedDate),
        size: 100,
    },
];

const getFilterValue = (
    table: TanStackTable<ReducedUser>,
    columnId: string
): string | undefined => {
    return table.getColumn(columnId)?.getFilterValue() as string | undefined;
};

const setFilterValue = (
    table: TanStackTable<ReducedUser>,
    columnId: string,
    value: string
): void => {
    table.getColumn(columnId)?.setFilterValue(value);
};


export const UsersTable: FC<{
    users: ReducedUser[];
}> = ({ users }) => {
    return (
        <DataTable
            columns={allColumns}
            data={users}
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
                    </div>
                    <Button asChild>
                        <Link href={`/admin/users/new`}>
                            <Plus />
                            New user
                        </Link>
                    </Button>
                </div>
            )}
        />
    );
};
