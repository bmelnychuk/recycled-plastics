'use client';

import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { Separator } from '@/design-system/components/ui/separator';
import { Textarea } from '@/design-system/components/ui/textarea';

import { MaterialTypeSelect } from '../material/MaterialTypeSelect';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/design-system/components/ui/field';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import {
  Dropzone,
  DropzoneEmptyState,
} from '@/design-system/components/ui/shadcn-io/dropzone';
import z from 'zod';
import { AlertTriangleIcon, CloudCheck, Trash, Upload } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/design-system/components/ui/item';
import { FormSection } from '../common/FormSection';
import { MaterialDataForm } from '@/features/material/MaterialDataForm';
import { CompanySelect } from '@/features/company/CompanySelect';
import { Card, CardContent } from '@/design-system/components/ui/card';
import { Switch } from '@/design-system/components/ui/switch';
import {
  Company,
  MaterialDemand,
  MaterialDemandSchema,
  MaterialDemandUpdateSchema,
  NewMaterialDemandSchema,
  SignedInUser,
} from '@rp/core';

import { updateDemand, createDemand } from '@/client';
import { PriceInput } from '../common/form/input/PriceInput';

const FormStateSchema = MaterialDemandSchema.omit({
  createdDate: true,
  updatedDate: true,
  id: true,
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  companyId: '',
  description: '',
  material: {
    color: 'transparent',
    type: 'abs',
    condition: 'granules',
    certificateOfAnalysis: false,
  },
  price: {
    amount: 0,
    currency: 'EUR',
  },
  amount: 0,
  location: {
    country: '',
  },
  verified: false,
};

export const EditDemandForm: FC<{
  demand: MaterialDemand;
  companies: Company[];
  user: SignedInUser;
}> = ({ demand, companies, user }) => {
  const router = useRouter();
  const { id, companyId } = demand;

  const onSubmit = async (data: FormState, files: File[]): Promise<void> => {
    try {
      await updateDemand(
        MaterialDemandUpdateSchema.parse({ ...data, id: demand.id }),
        files,
      );
      toast.success('Material demand updated successfully');
      router.replace(`/companies/${companyId}/demand/${id}`);
    } catch (error) {
      toast.error('Failed to update material demand');
    }
  };

  return (
    <DemandForm
      user={user}
      defaultValues={demand}
      onSubmit={onSubmit}
      companies={companies}
    />
  );
};

export const NewDemandForm: FC<{
  user: SignedInUser;
  companies: Company[];
  companyId?: string;
}> = ({ user, companies, companyId }) => {
  const router = useRouter();

  const onSubmit = async (data: FormState, files: File[]): Promise<void> => {
    try {
      await createDemand(NewMaterialDemandSchema.parse(data), files);
      toast.success('Material demand created successfully');
      router.push('/demand');
    } catch (error) {
      toast.error('Failed to create material demand');
    }
  };

  return (
    <DemandForm
      user={user}
      defaultValues={{ ...initialValues, companyId: companyId ?? '' }}
      companies={companies}
      onSubmit={onSubmit}
    />
  );
};

const DemandForm: FC<{
  user: SignedInUser;
  defaultValues?: FormState;
  companies: Company[];
  onSubmit: (data: FormState, files: File[]) => Promise<void>;
}> = ({ user, defaultValues, companies, onSubmit: onSubmitCallback }) => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<FormState>({
    resolver: zodResolver(FormStateSchema),
    defaultValues: defaultValues ?? initialValues,
  });

  const documents = form.watch('documents') ?? [];

  const handleDrop = (newFiles: File[]) => {
    const pdfFiles = newFiles.filter(
      (file) =>
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf'),
    );
    setFiles([...files, ...pdfFiles]);
  };

  const handleRemoveDocument = (index: number) => {
    const nextDocuments = documents.filter((_, i) => i !== index);
    form.setValue('documents', nextDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data: FormState) => onSubmitCallback(data, files);

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <FormSection
        title="Company"
        description="Assign the material supply to a company"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Controller
              name="companyId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companyId">Company *</FieldLabel>
                  <CompanySelect
                    disabled={Boolean(defaultValues?.companyId)}
                    options={companies}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Type at least 3 characters to search..."
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FormSection>
      <Separator />
      <FormSection
        title="General Information"
        description=" Provide general information about the material"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Controller
              name="material.type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="material.type">Material type</FieldLabel>
                  <MaterialTypeSelect {...field} />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    className="min-h-0 field-sizing-fixed"
                    rows={4}
                    {...field}
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FormSection>

      <Separator />

      <FormSection
        title="Material specifications"
        description=" Provide specifications about the material"
      >
        {/* @ts-ignore */}
        <MaterialDataForm control={form.control} />
      </FormSection>

      <Separator />
      <FormSection
        title="Commercial information"
        description="Provide commercial information about the material"
      >
        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="price">Price per ton *</FieldLabel>
              <PriceInput
                name="price"
                value={field.value}
                onChange={field.onChange}
              />
            </Field>
          )}
        />
        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="amount">Amount (ton / month) *</FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="0"
                onFocus={(e) =>
                  e.target.addEventListener(
                    'wheel',
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false },
                  )
                }
              />
            </Field>
          )}
        />
      </FormSection>
      <Separator />

      <FormSection
        title="Documents"
        description=" Provide documents about the material"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Dropzone
              accept={{ 'application/pdf': ['.pdf'] }}
              maxSize={1024 * 1024 * 10}
              minSize={1024}
              maxFiles={10}
              onDrop={(e) => handleDrop(e)}
              onError={console.error}
            >
              <DropzoneEmptyState />
            </Dropzone>

            <div className="mt-4 flex flex-col gap-2">
              {documents.map((document, i) => (
                <Item key={`${document.id}-${i}`} variant="outline">
                  <ItemMedia>
                    <CloudCheck size={16} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{document.name}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveDocument(i)}
                    >
                      <Trash />
                    </Button>
                  </ItemActions>
                </Item>
              ))}
              {files.map((file, i) => (
                <Item key={`${file.name}-${i}`} variant="outline">
                  <ItemMedia>
                    <Upload size={16} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{file.name}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setFiles(files.slice(0, i).concat(files.slice(i + 1)))
                      }
                    >
                      <Trash />
                    </Button>
                  </ItemActions>
                </Item>
              ))}
            </div>
          </div>
        </div>
      </FormSection>

      <Separator />

      {user.isAdmin && (
        <FormSection title="Verification status" description="">
          <Controller
            name="verified"
            control={form.control}
            render={({ field }) => (
              <Card>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertTriangleIcon />
                    <div>
                      <FieldLabel htmlFor="verified" className="Flex1">
                        Verified
                      </FieldLabel>
                      <FieldDescription>
                        Once verified, the material supply will be displayed
                        publicly
                      </FieldDescription>
                    </div>
                  </div>
                  <Switch
                    id="verified"
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                    className="w-12! h-7! data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 [&>span]:size-6! [&>span]:data-[state=checked]:translate-x-[calc(100%-2px)]"
                  />
                </CardContent>
              </Card>
            )}
          />
        </FormSection>
      )}

      <div className="flex items-center justify-end space-x-4">
        {hasErrors && (
          <div className="text-red-500 text-sm">Form has invalid fields</div>
        )}
        <Button
          type="submit"
          className="whitespace-nowrap"
          disabled={form.formState.isSubmitting}
        >
          Save demand
        </Button>
      </div>
    </form>
  );
};
