'use client';

import {
  MaterialDemand,
  SignedInUser,
  Company,
  MaterialSupply,
  User,
} from '@rp/core';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/design-system/components/ui/tabs';
import { Button } from '@/design-system/components/ui/button';
import { CompanyDemandTable } from '../../features/demand/DemandTable';

import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { CompanySupplyTable } from '../../features/supply/SupplyTable';
import { CompanyUserTable } from '@/features/admin/UserTable';

interface CompanyMaterialsProps {
  company: Company;
  supply: MaterialSupply[];
  demand: MaterialDemand[];
  user: SignedInUser;
  users: User[];
}

export const CompanyMaterials = ({
  users,
  company,
  supply,
  demand,
  user,
}: CompanyMaterialsProps) => {
  const canEdit = user?.isAdmin;

  return (
    <div className="px-4 py-4 min-w-0 sm:px-6">
      <Tabs defaultValue="supplier" className="w-full min-w-0">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {canEdit && (
            <Button
              asChild
              variant="secondary"
              className="w-full shrink-0 sm:w-auto order-first sm:order-last"
            >
              <Link href={`/admin/companies/${company.id}/edit`}>
                <PencilIcon className="size-4 sm:mr-1.5" />
                <span>Edit company</span>
              </Link>
            </Button>
          )}
          <TabsList className="h-auto w-full overflow-x-auto overflow-y-hidden p-1 backdrop-blur-sm sm:w-auto sm:overflow-visible [&>button]:shrink-0">
            <TabsTrigger
              value="supplier"
              className="text-sm px-4 py-2.5 sm:px-6 data-[state=active]:bg-white rounded-md transition-all"
            >
              <span className="font-bold">{supply.length}</span>
              <span className="ml-1.5 sm:ml-2 font-medium whitespace-nowrap">
                Supply
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="buyer"
              className="text-sm px-4 py-2.5 sm:px-6 data-[state=active]:bg-white rounded-md transition-all"
            >
              <span className="font-bold">{demand.length}</span>
              <span className="ml-1.5 sm:ml-2 font-medium whitespace-nowrap">
                Demand
              </span>
            </TabsTrigger>
            {users.length > 0 && (
              <TabsTrigger
                value="users"
                className="text-sm px-4 py-2.5 sm:px-6 data-[state=active]:bg-white rounded-md transition-all"
              >
                <span className="font-bold">{users.length}</span>
                <span className="ml-1.5 sm:ml-2 font-medium whitespace-nowrap">
                  Users
                </span>
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <TabsContent value="supplier" className="mt-0 min-w-0">
          <CompanySupplyTable
            supply={supply}
            user={user}
            companyId={company.id}
          />
        </TabsContent>

        <TabsContent value="buyer" className="mt-0 min-w-0">
          <CompanyDemandTable
            demand={demand}
            user={user}
            companyId={company.id}
          />
        </TabsContent>

        {users.length > 0 && user && (
          <TabsContent value="users" className="mt-0 min-w-0">
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <CompanyUserTable
                user={user}
                users={users}
                companyId={company.id}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
