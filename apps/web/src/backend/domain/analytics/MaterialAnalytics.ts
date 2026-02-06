import z from 'zod';
import { MaterialTypeSchema, MaterialType } from '../material/Material';
import { MaterialDemand } from '../material/demand/Demand';
import { MaterialSupply } from '../material/supply/Supply';
import { format, subMonths } from 'date-fns';
import { CountryCodeSchema } from '../common/types';
import { groupBy } from '../../lib/collections';

const AnalyticsByDateSchema = z.object({
  date: z.iso.date(),
  demand: z.object({
    price: z.number().int().positive(),
    amount: z.number().int().positive(),
  }),
  supply: z.object({
    price: z.number().int().positive(),
    amount: z.number().int().positive(),
  }),
});

const AnalyticsByCountrySchema = z.object({
  country: CountryCodeSchema,
  demand: z.object({
    price: z.number().int().positive(),
    amount: z.number().int().positive(),
  }),
  supply: z.object({
    price: z.number().int().positive(),
    amount: z.number().int().positive(),
  }),
});

const MaterialAnalyticsByDateSchema = z.object({
  materialType: MaterialTypeSchema,
  data: z.array(AnalyticsByDateSchema),
  type: z.literal('material-by-date'),
});

const MaterialAnalyticsByCountrySchema = z.object({
  materialType: MaterialTypeSchema,
  data: z.array(AnalyticsByCountrySchema),
  type: z.literal('material-by-country'),
});

const MaterialAnalyticsSchema = z.discriminatedUnion('type', [
  MaterialAnalyticsByDateSchema,
  MaterialAnalyticsByCountrySchema,
]);

export type MaterialAnalyticsByDate = z.infer<
  typeof MaterialAnalyticsByDateSchema
>;
export type MaterialAnalyticsByCountry = z.infer<
  typeof MaterialAnalyticsByCountrySchema
>;
export type MaterialAnalytics = z.infer<typeof MaterialAnalyticsSchema>;

type DemandOrSupply = MaterialDemand | MaterialSupply;

const updatedDate = (m: DemandOrSupply) => format(m.updatedDate, 'yyyy-MM');
const country = (m: DemandOrSupply) => m.location.country;
const amount = (m: DemandOrSupply) => m.amount;
const price = (m: DemandOrSupply) => m.price.amount;

const last6Months = () => {
  const now = new Date();
  return [
    format(subMonths(now, 5), 'yyyy-MM'),
    format(subMonths(now, 4), 'yyyy-MM'),
    format(subMonths(now, 3), 'yyyy-MM'),
    format(subMonths(now, 2), 'yyyy-MM'),
    format(subMonths(now, 1), 'yyyy-MM'),
    format(subMonths(now, 0), 'yyyy-MM'),
  ];
};

export const getAnalyticsByDate = (
  demand: MaterialDemand[],
  supply: MaterialSupply[],
): MaterialAnalyticsByDate[] => {
  const dates = last6Months();

  const demandByMaterial = groupBy(demand, ({ material }) => material.type);
  const supplyByMaterial = groupBy(supply, ({ material }) => material.type);

  const uniqueMaterials = new Set<MaterialType>([
    ...demandByMaterial.keys(),
    ...supplyByMaterial.keys(),
  ]);

  return Array.from(uniqueMaterials).map((m) => {
    const mDemand = demandByMaterial.get(m) || [];
    const mSupply = supplyByMaterial.get(m) || [];

    const demandAmounts = aggregateBy(mDemand, updatedDate, amount, sum);
    const demandPrices = aggregateBy(mDemand, updatedDate, price, avg);
    const supplyAmounts = aggregateBy(mSupply, updatedDate, amount, sum);
    const supplyPrices = aggregateBy(mSupply, updatedDate, price, avg);

    return {
      type: 'material-by-date',
      materialType: m,
      data: dates.map((d) => ({
        date: d,
        demand: {
          price: demandPrices.get(d) || 0,
          amount: demandAmounts.get(d) || 0,
        },
        supply: {
          price: supplyPrices.get(d) || 0,
          amount: supplyAmounts.get(d) || 0,
        },
      })),
    };
  });
};

export const getAnalyticsByCountry = (
  demand: MaterialDemand[],
  supply: MaterialSupply[],
): MaterialAnalyticsByCountry[] => {
  const countries = new Set<string>([
    ...demand.map((m) => m.location.country),
    ...supply.map((m) => m.location.country),
  ]);

  const demandByMaterial = groupBy(demand, ({ material }) => material.type);
  const supplyByMaterial = groupBy(supply, ({ material }) => material.type);

  const uniqueMaterials = new Set<MaterialType>([
    ...demandByMaterial.keys(),
    ...supplyByMaterial.keys(),
  ]);

  return Array.from(uniqueMaterials).map((m) => {
    const mDemand = demandByMaterial.get(m) || [];
    const mSupply = supplyByMaterial.get(m) || [];

    const demandAmounts = aggregateBy(mDemand, country, amount, sum);
    const demandPrices = aggregateBy(mDemand, country, price, avg);
    const supplyAmounts = aggregateBy(mSupply, country, amount, sum);
    const supplyPrices = aggregateBy(mSupply, country, price, avg);

    return {
      type: 'material-by-country',
      materialType: m,
      data: Array.from(countries).map((d) => ({
        country: d,
        demand: {
          price: demandPrices.get(d) || 0,
          amount: demandAmounts.get(d) || 0,
        },
        supply: {
          price: supplyPrices.get(d) || 0,
          amount: supplyAmounts.get(d) || 0,
        },
      })),
    };
  });
};

const sum = (data: number[]): number => data.reduce((a, b) => a + b, 0);
const avg = (data: number[]): number => Math.round(sum(data) / data.length);

const aggregateBy = <T>(
  data: T[],
  keyFn: (item: T) => string,
  valueFn: (item: T) => number,
  aggregateFn: (values: number[]) => number,
): Map<string, number> => {
  const cache = new Map<string, number[]>();

  for (const item of data) {
    const key = keyFn(item);
    const values = cache.get(key) || [];
    values.push(valueFn(item));
    cache.set(key, values);
  }

  return new Map(
    Array.from(cache.entries()).map(([month, values]) => [
      month,
      aggregateFn(values),
    ]),
  );
};
