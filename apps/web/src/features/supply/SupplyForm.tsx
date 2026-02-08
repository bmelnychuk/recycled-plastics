'use client';

import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { Separator } from '@/design-system/components/ui/separator';
import { Textarea } from '@/design-system/components/ui/textarea';
import { MaterialTypeSelect } from '@/features/material/MaterialTypeSelect';
import { MaterialDataForm } from '@/features/material/MaterialDataForm';

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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/design-system/components/ui/item';
import { AlertTriangleIcon, CloudCheck, Trash, Upload } from 'lucide-react';
import { FormSection } from '@/features/common/FormSection';
import { CompanySelect } from '@/features/company/CompanySelect';
import {
  MaterialSupply,
  MaterialSupplySchema,
  NewMaterialSupplySchema,
  Company,
  SupplyUpdateSchema,
  SignedInUser,
} from '@rp/core';
import { PriceInput } from '../common/form/input/PriceInput';
import { CountryDropdown } from '../common/CountryDropdown';
import { Switch } from '@/design-system/components/ui/switch';
import { Card, CardContent } from '@/design-system/components/ui/card';
import { createSupply, updateSupply } from '@/client';

const FormStateSchema = MaterialSupplySchema.omit({
  createdDate: true,
  updatedDate: true,
  id: true,
});

export type FormState = z.infer<typeof FormStateSchema>;

const defaultValues: FormState = {
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
  companyId: '',
  name: '',
  amount: 0,
  location: {
    country: '',
  },
  verified: false,
};

export const EditSupplyForm: FC<{
  user: SignedInUser;
  supply: MaterialSupply;
  companies: Company[];
}> = ({ user, supply, companies }) => {
  const router = useRouter();

  const onSubmit = async (
    data: FormState,
    files: File[],
    pictures: File[],
  ): Promise<void> => {
    try {
      await updateSupply(
        SupplyUpdateSchema.parse({ ...data, id: supply.id }),
        files,
        pictures,
      );
      toast.success('Material supply updated successfully');
      router.replace(`/companies/${supply.companyId}/supply/${supply.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update material demand');
    }
  };

  return (
    <SupplyForm
      user={user}
      defaultValues={supply}
      onSubmit={onSubmit}
      companies={companies}
    />
  );
};

export const NewSupplyForm: FC<{
  user: SignedInUser;
  companies: Company[];
  companyId?: string;
}> = ({ user, companies, companyId }) => {
  const router = useRouter();

  const onSubmit = async (
    data: FormState,
    documents: File[],
    pictures: File[],
  ): Promise<void> => {
    try {
      const validatedData = NewMaterialSupplySchema.parse(data);
      await createSupply(validatedData, documents, pictures);
      toast.success('Material supply created successfully');
      router.push('/supply');
    } catch (error) {
      toast.error('Failed to create material supply');
      console.error(error);
    }
  };

  return (
    <SupplyForm
      user={user}
      defaultValues={{ ...defaultValues, companyId: companyId ?? '' }}
      onSubmit={onSubmit}
      companies={companies}
    />
  );
};

const SupplyForm: FC<{
  user: SignedInUser;
  defaultValues?: FormState;
  companies: Company[];
  onSubmit: (
    data: FormState,
    docFiles: File[],
    pictureFiles: File[],
  ) => Promise<void>;
}> = ({ user, defaultValues, onSubmit: onSubmitCallback, companies }) => {
  const [docFiles, setDocFiles] = useState<File[]>([]);
  const [pictureFiles, setPictureFiles] = useState<File[]>([]);

  const form = useForm<FormState>({
    resolver: zodResolver(FormStateSchema),
    defaultValues,
  });

  const documents = form.watch('documents') ?? [];
  const pictures = form.watch('pictures') ?? [];

  const handleDrop = (category: 'doc' | 'picture', files: File[]) => {
    if (category === 'doc') {
      const pdfFiles = files.filter(
        (file) =>
          file.type === 'application/pdf' ||
          file.name.toLowerCase().endsWith('.pdf'),
      );
      setDocFiles([...docFiles, ...pdfFiles]);
    } else {
      const imageFiles = files.filter(
        (file) =>
          file.type.startsWith('image/') ||
          file.name.toLowerCase().endsWith('.jpg') ||
          file.name.toLowerCase().endsWith('.jpeg') ||
          file.name.toLowerCase().endsWith('.png'),
      );
      setPictureFiles([...pictureFiles, ...imageFiles]);
    }
  };

  const handleRemoveUploadedFile = (
    category: 'doc' | 'picture',
    index: number,
  ) => {
    const array = category === 'doc' ? documents : pictures;
    const valueKey = category === 'doc' ? 'documents' : 'pictures';

    const nextDocuments = array.filter((_, i) => i !== index);
    form.setValue(valueKey, nextDocuments, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemoveLocalFile = (
    category: 'doc' | 'picture',
    index: number,
  ) => {
    if (category === 'doc') {
      setDocFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      setPictureFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (d: FormState) =>
    onSubmitCallback(d, docFiles, pictureFiles);

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <FormSection
        title="Company"
        description="Assign the material supply to a company"
      >
        <Controller
          name="companyId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="companyId">Company</FieldLabel>
              <CompanySelect
                name="companyId"
                disabled={Boolean(defaultValues?.companyId) || !user.isAdmin}
                options={companies}
                value={field.value}
                onChange={field.onChange}
                placeholder="Type at least 3 characters to search..."
              />
            </Field>
          )}
        />
      </FormSection>

      <Separator />

      <FormSection
        title="General Information"
        description="Provide general information about the material"
      >
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
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input {...field} />
            </Field>
          )}
        />

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
        <Controller
          name="location.country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="location.country">Location</FieldLabel>
              <CountryDropdown value={field.value} onChange={field.onChange} />
            </Field>
          )}
        />
      </FormSection>

      <Separator />

      <FormSection
        title="Material specifications"
        description="Provide specifications about the material"
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
              <FieldLabel htmlFor="price">Price</FieldLabel>
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
              <FieldLabel htmlFor="amount">Amount</FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="Amount in kg"
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
        <Dropzone
          accept={{ 'application/pdf': ['.pdf'] }}
          maxSize={1024 * 1024 * 10}
          minSize={1024}
          maxFiles={10}
          onDrop={(e) => handleDrop('doc', e)}
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
                  onClick={() => handleRemoveUploadedFile('doc', i)}
                >
                  <Trash />
                </Button>
              </ItemActions>
            </Item>
          ))}
          {docFiles.map((file, i) => (
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
                    setDocFiles(
                      docFiles.slice(0, i).concat(docFiles.slice(i + 1)),
                    )
                  }
                >
                  <Trash />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </div>
      </FormSection>
      <Separator />

      <FormSection
        title="Images"
        description="Provide pictures about the material"
      >
        <Dropzone
          maxSize={1024 * 1024 * 10}
          minSize={1024}
          maxFiles={10}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/jpg': ['.jpg'],
          }}
          onDrop={(files) => handleDrop('picture', files)}
          onError={console.error}
        >
          <DropzoneEmptyState />
        </Dropzone>
        <div className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pictures.map((picture, index) => (
              <div key={`picture-${index}`} className="space-y-2">
                <figure className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={picture.url}
                    alt={`Material preview ${index + 1}`}
                    className="absolute inset-0 size-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 flex justify-end p-2 opacity-100 transition group-hover:opacity-100">
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="pointer-events-auto rounded-full border border-border bg-background/80 backdrop-blur"
                      onClick={() => handleRemoveUploadedFile('picture', index)}
                      aria-label="Remove image"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </figure>
                <div className="flex items-center gap-2 text-base text-muted-foreground">
                  <CloudCheck size={16} className="shrink-0" />
                  <span className="truncate">
                    {picture.name ?? picture.url.split('/').pop()}
                  </span>
                </div>
              </div>
            ))}
            {pictureFiles.map((picture, index) => (
              <div key={`localpicture-${index}`} className="space-y-2">
                <figure className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={URL.createObjectURL(picture)}
                    alt={`Material preview ${index + 1}`}
                    className="absolute inset-0 size-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 flex justify-end p-2 opacity-100 transition group-hover:opacity-100">
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="pointer-events-auto rounded-full border border-border bg-background/80 backdrop-blur"
                      onClick={() => handleRemoveLocalFile('picture', index)}
                      aria-label="Remove image"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </figure>
                <div className="flex items-center gap-2 text-base text-muted-foreground">
                  <Upload size={16} className="shrink-0" />
                  <span className="truncate">{picture.name}</span>
                </div>
              </div>
            ))}
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
        <Button loading={form.formState.isSubmitting} type="submit">
          Save supply
        </Button>
      </div>
    </form>
  );
};
