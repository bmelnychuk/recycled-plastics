"use client";

import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { Separator } from "@/design-system/components/ui/separator";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/design-system/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import {
  UserSchema,
  AdminUserUpdateSchema,
  CurrentUserUpdateSchema,
  NewUserSchema,
} from "@/backend";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import z from "zod";
import { UserViewModel } from "@/backend";
import { updateUser, createUser, VerifiedCompany, updateCurrentUser } from "@/backend/api";
import { Trash, Plus } from "lucide-react";
import { CompanySelect } from "../company/CompanySelect";
import { CompanyVerificationIcon } from "../company/CompanyVerificationIcon";
import { Label } from "@/design-system/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/design-system/components/ui/radio-group";
import { FormSection } from "../common/FormSection";

const FormStateSchema = UserSchema.omit({
  id: true,
  createdDate: true,
  updatedDate: true,
});

export type FormState = z.infer<typeof FormStateSchema>;

const initialValues: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  title: "",
  plan: "free" as const,
  contactData: {
    emails: [],
    phoneNumbers: [],
  },
  integrations: {}
};

export const EditUserForm: FC<{
  id: string;
  defaultValues: UserViewModel;
  companies: VerifiedCompany[];
}> = ({ id, defaultValues, companies }) => {
  const router = useRouter();

  const onSubmit = async (data: FormState): Promise<void> => {
    try {
      await updateUser(AdminUserUpdateSchema.parse({ ...data, id }));
      toast.success("User updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  return (
    <UserForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      companies={companies}
    />
  );
};

export const EditCurrentUserForm: FC<{
  currentUser: UserViewModel;
}> = ({ currentUser }) => {
  const router = useRouter();

  const onSubmit = async (data: FormState): Promise<void> => {
    try {
      await updateCurrentUser(CurrentUserUpdateSchema.parse({ ...currentUser, ...data }));
      toast.success("User updated successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  return (
    <UserForm
      defaultValues={currentUser}
      onSubmit={onSubmit}
      companies={[]}
      hiddenFields={["company", "subscription", "integrations"]}
    />
  );
};

export const NewUserForm: FC<{
  companies: VerifiedCompany[];
  companyId?: string;
}> = ({ companies, companyId }) => {
  const router = useRouter();

  const onSubmit = async (data: FormState): Promise<void> => {
    try {
      await createUser(NewUserSchema.parse(data));
      toast.success("User created successfully");
      router.push("/admin/users");
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <UserForm
      onSubmit={onSubmit}
      companies={companies}
      defaultValues={{ ...initialValues, companyId }}
    />
  );
};

const UserForm: FC<{
  defaultValues?: FormState;
  onSubmit: (data: FormState) => Promise<void>;
  companies: VerifiedCompany[];
  hiddenFields?: string[];
}> = ({
  defaultValues,
  onSubmit: onSubmitCallback,
  companies,
  hiddenFields,
}) => {
    const form = useForm<FormState>({
      resolver: zodResolver(FormStateSchema),
      defaultValues: defaultValues ?? initialValues,
    });

    const emailsField = useFieldArray({
      control: form.control,
      name: "contactData.emails" as never,
    });

    const phoneNumbersField = useFieldArray({
      control: form.control,
      name: "contactData.phoneNumbers" as never,
    });

    const onSubmit = (data: FormState) => onSubmitCallback(data);

    const isEditMode = !!defaultValues;
    const selectedCompanyId = form.watch("companyId");
    const selectedCompany = selectedCompanyId
      ? companies.find((c) => c.id === selectedCompanyId)
      : undefined;

    return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormSection
          title="Personal Information"
          description="Provide basic information about the user"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Primary Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      disabled={isEditMode}
                      placeholder="user@example.com"
                    />
                    {isEditMode && (
                      <FieldDescription>
                        Contact support if you need to change the primary email
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstName">First name</FieldLabel>
                    <Input {...field} placeholder="Enter first name" />
                  </Field>
                )}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                    <Input {...field} placeholder="Enter last name" />
                  </Field>
                )}
              />
            </div>
            <div className="col-span-full">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Job Title</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="e.g., Product Manager"
                    />
                  </Field>
                )}
              />
            </div>
          </div>
        </FormSection>

        <Separator />

        {!hiddenFields?.includes("company") && (
          <>
            <FormSection
              title="Company"
              description="Assign the user to a company"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <div className="col-span-full">
                  <Controller
                    name="companyId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="companyId">Company</FieldLabel>
                        <CompanySelect
                          options={companies}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Type at least 3 characters to search..."
                        />
                        <FieldDescription>
                          Leave empty if the user is not associated with any
                          company
                        </FieldDescription>
                      </Field>
                    )}
                  />
                </div>
              </div>
              {selectedCompany && (
                <Card>
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CompanyVerificationIcon verified={selectedCompany.verified} />
                      <Link
                        href={`/admin/companies/${selectedCompany.id}/edit`}
                        className="font-medium text-primary underline"
                      >
                        {selectedCompany.name}
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Updated{" "}
                      {new Date(selectedCompany.updatedDate).toLocaleDateString(
                        undefined,
                        { dateStyle: "medium" }
                      )}
                    </p>
                  </CardContent>
                </Card>
              )}
            </FormSection>
            <Separator />
          </>
        )}



        <FormSection
          title="Contact Information"
          description="Provide contact details for the user"
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel>Additional Emails</FieldLabel>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => emailsField.append("")}
                  >
                    <Plus />
                    Add Email
                  </Button>
                </div>
                {emailsField.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Controller
                      name={`contactData.emails.${index}`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="flex-1"
                        >
                          <Input
                            {...field}
                            type="email"
                            placeholder="additional@example.com"
                            value={field.value ?? ""}
                          />
                        </Field>
                      )}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => emailsField.remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {emailsField.fields.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No additional emails added
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <FieldLabel>Phone Numbers</FieldLabel>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => phoneNumbersField.append("")}
                >
                  <Plus />
                  Add Phone
                </Button>
              </div>
              {phoneNumbersField.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Controller
                    name={`contactData.phoneNumbers.${index}`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="flex-1">
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={field.value ?? ""}
                        />
                      </Field>
                    )}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => phoneNumbersField.remove(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {phoneNumbersField.fields.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No phone numbers added
                </p>
              )}
            </div>
          </div>
        </FormSection>

        {!hiddenFields?.includes("integrations") &&
          defaultValues?.integrations &&
          Object.keys(defaultValues.integrations).length > 0 && (
            <>
              <Separator />

              <FormSection
                title="Integrations"
                description="Third-party service integrations for this user"
              >
                <div className="flex flex-col gap-4">
                  {Object.entries(defaultValues.integrations).map(
                    ([key, value]) => (
                      <Field key={key}>
                        <FieldLabel>{key}</FieldLabel>
                        <Input value={value} disabled className="bg-muted" />
                      </Field>
                    )
                  )}
                </div>
              </FormSection>
            </>
          )}

        {!hiddenFields?.includes("subscription") && (
          <>
            <Separator />
            <FormSection
              title="Subscription Plan"
              description="Select the user's subscription plan level"
            >
              <Controller
                name="plan"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="gap-4"
                    >
                      <Label
                        htmlFor="plan-free"
                        className={`flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer ${field.value === "free"
                          ? "border-primary bg-primary/5"
                          : ""
                          }`}
                      >
                        <RadioGroupItem value="free" id="plan-free" />
                        <div className="flex-1">
                          <div className="font-semibold">Free Plan</div>
                          <div className="text-sm text-muted-foreground">
                            Basic access with limited features
                          </div>
                        </div>
                      </Label>
                      <Label
                        htmlFor="plan-pro"
                        className={`flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer ${field.value === "pro"
                          ? "border-primary bg-primary/5"
                          : ""
                          }`}
                      >
                        <RadioGroupItem value="pro" id="plan-pro" />
                        <div className="flex-1">
                          <div className="font-semibold">Pro Plan</div>
                          <div className="text-sm text-muted-foreground">
                            Full access with all premium features
                          </div>
                        </div>
                      </Label>
                    </RadioGroup>
                  </Field>
                )}
              />
            </FormSection>


          </>
        )}

        <div className="flex items-center justify-end space-x-4">
          <Button
            type="submit"
            className="whitespace-nowrap"
            disabled={form.formState.isSubmitting}
          >
            {defaultValues ? "Update user" : "Create user"}
          </Button>
        </div>
      </form>
    );
  };
