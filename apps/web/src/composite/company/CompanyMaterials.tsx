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
    <div className="px-4 py-4">
      <Tabs defaultValue="supplier" className="w-full">
        <div className="mb-2 flex items-center justify-between gap-2">
          <TabsList className="h-auto p-1 backdrop-blur-sm">
            <TabsTrigger
              value="supplier"
              className="text-sm px-6 py-2.5 data-[state=active]:bg-white rounded-md transition-all"
            >
              <span className="font-bold text-base">{supply.length}</span>
              <span className="ml-2 font-medium">Supply Materials</span>
            </TabsTrigger>
            <TabsTrigger
              value="buyer"
              className="text-sm px-6 py-2.5 data-[state=active]:bg-white rounded-md transition-all"
            >
              <span className="font-bold text-base">{demand.length}</span>
              <span className="ml-2 font-medium">Demand Materials</span>
            </TabsTrigger>
            {users.length > 0 && (
              <TabsTrigger
                value="users"
                className="text-sm px-6 py-2.5 data-[state=active]:bg-white rounded-md transition-all"
              >
                <span className="font-bold text-base">{users.length}</span>
                <span className="ml-2 font-medium">Users</span>
              </TabsTrigger>
            )}
          </TabsList>
          {canEdit && (
            <Button asChild variant="secondary">
              <Link href={`/admin/companies/${company.id}/edit`}>
                <PencilIcon />
                Edit company
              </Link>
            </Button>
          )}
        </div>

        <TabsContent value="supplier" className="mt-0">
          <CompanySupplyTable
            supply={supply}
            user={user}
            companyId={company.id}
          />
        </TabsContent>

        <TabsContent value="buyer" className="mt-0">
          <CompanyDemandTable
            demand={demand}
            user={user}
            companyId={company.id}
          />
        </TabsContent>

        {users.length > 0 && user && (
          <TabsContent value="users" className="mt-0">
            <CompanyUserTable
              user={user}
              users={users}
              companyId={company.id}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
