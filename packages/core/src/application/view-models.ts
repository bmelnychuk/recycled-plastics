import z from 'zod';
import { CompanySchema } from '../domain/company/Company';
import { MaterialSupplySchema } from '../domain/supply/Supply';
import { MaterialDemandSchema } from '../domain/demand/Demand';

export const SupplyViewModelSchema = MaterialSupplySchema.extend({
  company: CompanySchema.optional(),
});

export const DemandViewModelSchema = MaterialDemandSchema.extend({
  company: CompanySchema.optional(),
});

export type SupplyViewModel = z.infer<typeof SupplyViewModelSchema>;
export type DemandViewModel = z.infer<typeof DemandViewModelSchema>;
