import { z } from 'zod';
import { AddressSchema, ColorCodeSchema } from '../common/types';

export const CompanySchema = z.object({
  id: z.uuid(),
  createdDate: z.iso.datetime(),
  updatedDate: z.iso.datetime(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  website: z.url(),
  industry: z.string().nonempty(),
  email: z.email().toLowerCase(),
  phone: z.string().nonempty(),
  address: AddressSchema,
  branding: z
    .object({
      logo: z.url().optional(),
      primaryColor: ColorCodeSchema.optional(),
    })
    .optional(),
  verified: z.boolean(),
});

export const CompanyDetailsSchema = CompanySchema.extend({
  demand: z.number().int().nonnegative(),
  supply: z.number().int().nonnegative(),
});

export type Company = z.infer<typeof CompanySchema>;
export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>;
