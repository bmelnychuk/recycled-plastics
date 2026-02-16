import z from 'zod';
import { CompanySchema } from '../domain/company/Company';
import { MaterialSupplySchema } from '../domain/supply/Supply';
import { MaterialDemandSchema } from '../domain/demand/Demand';
import {
  MessageSchema,
  MessageThreadSchema,
} from '../domain/communication/Message';
import { UserSchema } from '../domain/user/User';

export const SupplyViewModelSchema = MaterialSupplySchema.extend({
  company: CompanySchema.optional(),
});

export const DemandViewModelSchema = MaterialDemandSchema.extend({
  company: CompanySchema.optional(),
});

export const MessageThreadViewModelSchema = MessageThreadSchema.extend({
  from: MessageThreadSchema.shape.from.extend({
    company: CompanySchema,
  }),
  to: MessageThreadSchema.shape.to.extend({
    company: CompanySchema,
  }),
});

export const MessageViewModelSchema = MessageSchema.extend({
  createdBy: MessageSchema.shape.createdBy.extend({
    user: UserSchema.optional(),
  }),
});

export type SupplyViewModel = z.infer<typeof SupplyViewModelSchema>;
export type DemandViewModel = z.infer<typeof DemandViewModelSchema>;
export type MessageThreadViewModel = z.infer<
  typeof MessageThreadViewModelSchema
>;
export type MessageViewModel = z.infer<typeof MessageViewModelSchema>;
