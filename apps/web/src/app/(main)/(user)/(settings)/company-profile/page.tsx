import { application } from '@/core';
import {
  EditCurrentCompanyForm,
  NewCompanyForm,
} from '@/features/company/CompanyForm';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
} from '@/design-system/components/ui/item';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/design-system/components/ui/button';

export default async function Page() {
  const company = await application.getCurrentCompany();

  return (
    <div className="p-10 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">
        {company?.verified ? 'Company' : 'Company (Unverified)'}
      </h1>
      {company?.verified && (
        <div className="flex w-full max-w-lg ">
          <Item variant="muted">
            <ItemMedia variant="icon">
              <InfoIcon />
            </ItemMedia>
            <ItemContent>
              <ItemDescription>
                Your company has been verified. However, any updates require our
                team to review the changes.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline" asChild>
                <a href="mailto:contact@recycled-plastics.com">Contact</a>
              </Button>
            </ItemActions>
          </Item>
        </div>
      )}
      <div className="w-full max-w-4xl">
        {company ? (
          <EditCurrentCompanyForm id={company.id} defaultValues={company} />
        ) : (
          <NewCompanyForm />
        )}
      </div>
    </div>
  );
}
