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

export type Address = z.infer<typeof AddressSchema>;
export type Price = z.infer<typeof PriceSchema>;
export type Currency = z.infer<typeof CurrencySchema>;

export const ColorCodeSchema = z.string().regex(/^#[0-9a-f]{6}$/i);


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

export type Document = z.infer<typeof DocumentSchema>;