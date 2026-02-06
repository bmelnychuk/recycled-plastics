import z from 'zod';
import { CountryCodeSchema, PriceSchema } from '../../common/types';
import { DocumentSchema, MaterialDataSchema } from '../Material';

export const MaterialDemandSchema = z.object({
  id: z.uuid(),
  companyId: z.uuid(),
  createdDate: z.iso.datetime(),
  updatedDate: z.iso.datetime(),
  description: z.string().optional(),
  material: MaterialDataSchema,
  price: PriceSchema,
  amount: z.coerce.number<number>().positive(),
  documents: z.array(DocumentSchema).optional(),
  location: z.object({ country: CountryCodeSchema }),
  verified: z.boolean(),
});


export type MaterialDemand = z.infer<typeof MaterialDemandSchema>;
