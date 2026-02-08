'use client';

import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { Separator } from '@/design-system/components/ui/separator';
import { Textarea } from '@/design-system/components/ui/textarea';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/design-system/components/ui/field';
import { Checkbox } from '@/design-system/components/ui/checkbox';
import { CountryDropdown } from '@/features/common/CountryDropdown';
import { CompanyColorSelect } from '@/composite/form/CompanyColorSelect';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Company,
  CompanySchema,
  CompanyUpdateSchema,
  NewCompanySchema,
  CurrentCompanyUpdateSchema,
} from '@rp/core';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import z from 'zod';
import { Trash, Upload, ImagePlus, AlertTriangleIcon } from 'lucide-react';
import { FormSection } from '../common/FormSection';
import { Card, CardContent } from '@/design-system/components/ui/card';
import { Switch } from '@/design-system/components/ui/switch';
import { application } from '@/core';

const FormStateSchema = CompanySchema.omit({
  id: true,
  createdDate: true,
  updatedDate: true,
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  mainContact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  name: '',
  description: '',
  website: '',
  industry: '',
  email: '',
  phone: '',
  address: {
    country: '',
    city: '',
    street: '',
    zipCode: '',
  },
  branding: {
    logo: undefined,
    primaryColor: '#c1d0ff',
  },
  verified: false,
};

export const EditCompanyForm: FC<{
  id: string;
  defaultValues: Company;
}> = ({ id, defaultValues }) => {
  const router = useRouter();

  const onSubmit = async (data: FormState, logoFile?: File): Promise<void> => {
    try {
      await application.updateCompany(
        CompanyUpdateSchema.parse({ ...data, id }),
      );
      toast.success('Company updated successfully');
      router.replace(`/companies/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update company');
    }
  };

  return <CompanyForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export const EditCurrentCompanyForm: FC<{
  id: string;
  defaultValues: Company;
}> = ({ id, defaultValues }) => {
  const router = useRouter();

  const onSubmit = async (data: FormState, logoFile?: File): Promise<void> => {
    try {
      await application.updateCurrentCompany(
        CurrentCompanyUpdateSchema.parse({ ...data, id }),
      );
      toast.success('Company updated successfully');
      router.replace(`/companies/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update company');
    }
  };

  return (
    <CompanyForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      hiddenFields={['verified']}
      disabled={defaultValues.verified}
    />
  );
};

export const NewCompanyForm = () => {
  const router = useRouter();

  const onSubmit = async (data: FormState, logoFile?: File): Promise<void> => {
    try {
      await application.createCompany(NewCompanySchema.parse(data));
      toast.success('Company created successfully');
      router.push('/companies');
    } catch (error) {
      toast.error('Failed to create company');
    }
  };

  return <CompanyForm onSubmit={onSubmit} />;
};

export const CompanyForm: FC<{
  defaultValues?: FormState;
  hiddenFields?: string[];
  disabled?: boolean;
  onSubmit: (data: FormState, logoFile?: File) => Promise<void>;
}> = ({
  defaultValues,
  hiddenFields,
  disabled,
  onSubmit: onSubmitCallback,
}) => {
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);

  const form = useForm<FormState>({
    resolver: zodResolver(FormStateSchema),
    defaultValues: defaultValues ?? initialValues,
  });

  const currentLogo = form.watch('branding.logo');

  const handleLogoUpload = (files: File[]) => {
    const imageFile = files[0];
    if (imageFile) setLogoFile(imageFile);
  };

  const handleRemoveLogo = () => {
    setLogoFile(undefined);
    form.setValue('branding.logo', undefined);
  };

  const onSubmit = (data: FormState) => onSubmitCallback(data, logoFile);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <FormSection
        title="General Information"
        description=" Provide general information about the company"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Controller
              name="name"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Company Name</FieldLabel>
                  <Input {...field} placeholder="Enter company name" />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="description"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    className="min-h-0 field-sizing-fixed"
                    rows={4}
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Enter company description"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="industry"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="industry">Industry</FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g., Manufacturing, Technology"
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FormSection>

      <Separator />

      <FormSection
        title="Contact Information"
        description="Provide contact details for the company"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Controller
              disabled={disabled}
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="company@example.com"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="website"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website">Website</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="url"
                    placeholder="https://www.example.com"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="phone"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="address.street"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address.street">Street</FieldLabel>
                  <Input {...field} placeholder="Enter street address" />
                </Field>
              )}
            />
          </div>
          <div className="col-span-3">
            <Controller
              name="address.city"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address.city">City</FieldLabel>
                  <Input {...field} placeholder="Enter city" />
                </Field>
              )}
            />
          </div>
          <div className="col-span-3">
            <Controller
              name="address.zipCode"
              disabled={disabled}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address.zipCode">Zip Code</FieldLabel>
                  <Input {...field} placeholder="Enter zip code" />
                </Field>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              name="address.country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="location.country">Country</FieldLabel>
                  <CountryDropdown
                    disabled={disabled}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FormSection>

      <Separator />

      <FormSection
        title="Branding"
        description="Customize the company's visual appearance"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <FieldLabel>Company Logo</FieldLabel>
            <div className="mt-2">
              {logoFile || currentLogo ? (
                <div className="group relative w-32 h-32 rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted/50">
                  <Image
                    src={
                      logoFile
                        ? URL.createObjectURL(logoFile)
                        : (currentLogo ?? '')
                    }
                    alt="Company logo"
                    fill
                    className="object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      disabled={disabled}
                      type="button"
                      size="icon"
                      variant="secondary"
                      onClick={() =>
                        document.getElementById('logo-upload')?.click()
                      }
                      aria-label="Change logo"
                    >
                      <ImagePlus size={18} />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={handleRemoveLogo}
                      aria-label="Remove logo"
                    >
                      <Trash size={18} />
                    </Button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground text-center px-2">
                    Click to upload
                  </span>
                </label>
              )}
              <input
                id="logo-upload"
                type="file"
                disabled={disabled}
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleLogoUpload([file]);
                  }
                }}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>
          <div className="col-span-full">
            <Controller
              name="branding.primaryColor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="branding.primaryColor">
                    Primary Color
                  </FieldLabel>
                  <CompanyColorSelect
                    disabled={disabled}
                    name="branding.primaryColor"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FormSection>

      {!hiddenFields?.includes('verified') && (
        <>
          <Separator />
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
        </>
      )}

      <div className="flex items-center justify-end space-x-4">
        <Button
          type="submit"
          className="whitespace-nowrap"
          disabled={disabled || form.formState.isSubmitting}
        >
          {defaultValues ? 'Update company' : 'Create company'}
        </Button>
      </div>
    </form>
  );
};
