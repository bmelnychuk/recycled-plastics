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
  amount: z
    .number()
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

export type Price = z.infer<typeof PriceSchema>;


export const ColorCodeSchema = z.string().regex(/^#[0-9a-f]{6}$/i);