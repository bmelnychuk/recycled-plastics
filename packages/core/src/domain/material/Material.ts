import z from 'zod';

export const UnitSchema = z.enum([
  'PERCENT',
  'GRAMS_PER_CUBIC_CENTIMETER',
  'KG_PER_CUBIC_METER',
]);
export const StandardSchema = z.enum([
  'ISO_1183',
  'DIN_53479',
  'ASTM_D1895',
  'EN_15345',
  'EN_15342',
]);

export const MaterialTypeSchema = z.enum([
  'abs',
  'eva',
  'hdpe',
  'ldpe',
  'mdpe',
  'pa',
  'pa6',
  'pa66',
  'pa12',
  'pet',
  'pp',
]);

export const MaterialColorSchema = z.enum([
  'transparent',
  'mixed',
  'gray',
  'white',
  'black',
  'red',
  'yellow',
  'green',
  'blue',
  'brown',
  'terracotta',
  'natural',
  'other',
]);

export const MaterialConditionSchema = z.enum([
  'granules',
  'regrind',
  'agglomerate',
  'powder',
  'other',
]);

export const MinMaxSchema = z
  .object({
    min: z.coerce.number<number>().optional(),
    max: z.coerce.number<number>().optional(),
  })
  .refine(({ min, max }) => min !== undefined || max !== undefined, {
    message: 'At least one of min or max must be present',
  })
  .refine(
    ({ min, max }) => {
      if (min !== undefined && max !== undefined) return max >= min;
      return true;
    },
    { message: 'Max value must be greater than or equal to min value' },
  );

export const AshContentSchema = z.object({
  value: MinMaxSchema,
});

export const ResidualMoistureContentSchema = z.object({
  value: MinMaxSchema,
});

export const BulkDensitySchema = z.object({
  value: MinMaxSchema,
});

export const RecycledContentSchema = z.object({
  value: MinMaxSchema,
});

export const ChainOfCustodySchema = z.enum([
  'physicalSegregation',
  'controlledBlending',
  'massBalance',
  'fuelExempt',
]);

export const MaterialSourceSchema = z.enum([
  'postConsumer',
  'postIndustrial',
  'preConsumer',
]);

export const RecyclingMethodSchema = z.enum([
  'mechanical',
  'chemical',
  'solventBased',
]);

export const PackagingTypeSchema = z.enum([
  'bigBags',
  'octabins',
  'silos',
  'sacks',
]);

export const MaterialOriginSchema = z.object({
  category: z.enum([
    'agriculture',
    'construction',
    'packaging_household',
    'packaging_transport',
    'housewares',
    'leisure',
    'sport',
    'mixed',
  ]),
  description: z.string().optional(),
});

export const ProcessingMethodSchema = z.enum([
  'blowMolding',
  'calendering',
  'extrusion',
  'injectionMolding',
  'rotationalMolding',
  'sintering',
  'thermoforming',
  'recycling',
]);

export const IntendedMarketSchema = z.enum([
  'nonFoodPackaging',
  'construction',
  'automotive',
  'agriculture',
  'foodPackaging',
  'electronicsElectric',
  'consumerGoods',
  'cosmetics',
]);

export const ViscositySchema = z.object({
  value: MinMaxSchema,
});

export const DensitySchema = z.object({
  value: MinMaxSchema,
});

export const MaterialFillerTypeSchema = z.enum([
  'glassFibres',
  'carbonFibres',
  'carbonBlack',
  'naturalFibres',
  'talcum',
  'calciumCarbonate',
  'silica',
  'mica',
  'chalk',
]);

export const FillerSchema = z.object({
  type: MaterialFillerTypeSchema,
  value: MinMaxSchema,
});

export const MaterialDataSchema = z.object({
  type: MaterialTypeSchema,
  color: MaterialColorSchema,
  packagingTypes: z.array(PackagingTypeSchema).optional(),
  recycledContent: RecycledContentSchema.optional(),
  chainOfCustody: ChainOfCustodySchema.optional(),
  recyclingMethod: RecyclingMethodSchema.optional(),
  source: MaterialSourceSchema.optional(),
  processingMethods: z.array(ProcessingMethodSchema).optional(),
  intendedMarket: IntendedMarketSchema.optional(),
  viscosity: ViscositySchema.optional(),
  density: DensitySchema.optional(),
  bulkDensity: BulkDensitySchema.optional(),
  ashContent: AshContentSchema.optional(),
  condition: MaterialConditionSchema.optional(),
  residualMoistureContent: ResidualMoistureContentSchema.optional(),
  fillers: z.array(FillerSchema).optional(),
  certificateOfAnalysis: z.boolean(),
});

export type MaterialType = z.infer<typeof MaterialTypeSchema>;
export type MaterialColor = z.infer<typeof MaterialColorSchema>;
export type MaterialCondition = z.infer<typeof MaterialConditionSchema>;
export type MaterialData = z.infer<typeof MaterialDataSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type MinMax = z.infer<typeof MinMaxSchema>;
export type ProcessingMethod = z.infer<typeof ProcessingMethodSchema>;
export type PackagingType = z.infer<typeof PackagingTypeSchema>;
export type ChainOfCustody = z.infer<typeof ChainOfCustodySchema>;
export type RecyclingMethod = z.infer<typeof RecyclingMethodSchema>;
export type MaterialSource = z.infer<typeof MaterialSourceSchema>;
export type IntendedMarket = z.infer<typeof IntendedMarketSchema>;
export type MaterialFillerType = z.infer<typeof MaterialFillerTypeSchema>;
export type Filler = z.infer<typeof FillerSchema>;