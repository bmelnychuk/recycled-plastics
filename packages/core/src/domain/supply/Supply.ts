import z from 'zod';
import {
  DocumentSchema,
  CountryCodeSchema,
  PriceSchema,
} from '../common/common';
import { MaterialDataSchema } from '../material/Material';

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
