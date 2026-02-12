import { z } from 'zod';

export const CurrencySchema = z.enum([
  'EUR',
  'USD',
  'GBP',
  'CHF',
  'JPY',
  'CNY',
]);

export const PriceSchema = z.object({
  amount: z.coerce
    .number<number>()
    .int()
    .positive()
    .describe('Expressed in minor currency units'),
  currency: CurrencySchema,
});

export const CountryCodeSchema = z
  .string()
  .uppercase()
  .length(2)
  .describe('ISO 3166-1 alpha-2 code');

export const AddressSchema = z.object({
  country: CountryCodeSchema,
  city: z.string().nonempty(),
  street: z.string().nonempty(),
  zipCode: z.string().nonempty(),
});

export const ColorSchema = z.enum([
  'amber',
  'blue',
  'bronze',
  'brown',
  'crimson',
  'cyan',
  'gold',
  'grass',
  'gray',
  'green',
  'indigo',
  'iris',
  'jade',
  'lime',
  'mint',
  'olive',
  'orange',
  'pink',
  'plum',
  'purple',
  'red',
  'ruby',
  'sand',
  'sky',
  'slate',
  'teal',
  'tomato',
  'violet',
  'yellow',
]);

export const DocumentSchema = z.object({
  id: z.uuid(),
  url: z.url(),
  name: z.string().nonempty(),
  createdDate: z.iso.datetime(),
  size: z.number().int().positive().describe('Size in bytes'),
  contentType: z.enum([
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
  ]),
});

export type Address = z.infer<typeof AddressSchema>;
export type Price = z.infer<typeof PriceSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Document = z.infer<typeof DocumentSchema>;
export type Color = z.infer<typeof ColorSchema>;
