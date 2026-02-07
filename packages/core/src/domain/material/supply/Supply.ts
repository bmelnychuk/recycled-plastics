import z from 'zod';
import { MaterialDataSchema } from '../Material';
import { DocumentSchema } from '../../common/types';
import { CountryCodeSchema, PriceSchema } from '../../common/types';

export const MaterialSupplySchema = z.object({
  id: z.uuid(),
  companyId: z.uuid(),
  createdDate: z.iso.datetime(),
  updatedDate: z.iso.datetime(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  material: MaterialDataSchema,
  price: PriceSchema,
  amount: z.coerce.number<number>().positive(),
  documents: z.array(DocumentSchema).optional(),
  pictures: z.array(DocumentSchema).optional(),
  location: z.object({ country: CountryCodeSchema }),
  verified: z.boolean(),
});

export type MaterialSupply = z.infer<typeof MaterialSupplySchema>;