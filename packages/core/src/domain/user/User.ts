import { z } from 'zod';

export const PlanTypeSchema = z.enum(['free', 'pro']);

export const ContactDataSchema = z.object({
  emails: z.array(z.email().toLowerCase()).optional(),
  phoneNumbers: z.array(z.string()).optional(),
});

export const UserSchema = z.object({
  id: z.uuid(),
  companyId: z.uuid().optional(),
  email: z.email().toLowerCase(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  createdDate: z.iso.datetime(),
  updatedDate: z.iso.datetime(),
  plan: PlanTypeSchema,
  title: z.string().optional(),
  contactData: ContactDataSchema.optional(),
  integrations: z.object({
    clerk: z.string().nonempty().optional(),
    stripe: z.string().nonempty().optional(),
  }).optional()
});

export type User = z.infer<typeof UserSchema>;
export type PlanType = z.infer<typeof PlanTypeSchema>;
