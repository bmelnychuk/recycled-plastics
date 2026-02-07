import z from 'zod';
import {
  CompanyDetailsSchema,
  CompanySchema,
} from '../../domain/company/Company';
import { MaterialSupplySchema } from '../../domain/material/supply/Supply';
import { UserSchema } from '../../domain/user/User';
import { MaterialDemandSchema } from '../../domain/material/demand/Demand';

export const UserViewModelSchema = UserSchema.extend({
  company: CompanySchema.optional(),
});

export const SupplyViewModelSchema = MaterialSupplySchema.extend({
  company: CompanySchema.optional(),
});

export const DemandViewModelSchema = MaterialDemandSchema.extend({
  company: CompanySchema.optional(),
});

export const CompanyViewModelSchema = CompanyDetailsSchema.extend({
  mainContact: UserSchema.optional(),
});

export type UserViewModel = z.infer<typeof UserViewModelSchema>;
export type SupplyViewModel = z.infer<typeof SupplyViewModelSchema>;
export type DemandViewModel = z.infer<typeof DemandViewModelSchema>;
export type CompanyViewModel = z.infer<typeof CompanyViewModelSchema>;
