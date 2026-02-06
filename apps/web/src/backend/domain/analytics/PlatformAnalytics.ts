import z from 'zod';

export const PlatformAnalyticsSchema = z.object({
  companies: z.number().int().positive(),
  users: z.number().int().positive(),
  demand: z.number().int().positive(),
  supply: z.number().int().positive(),
});

export type PlatformAnalytics = z.infer<typeof PlatformAnalyticsSchema>;
