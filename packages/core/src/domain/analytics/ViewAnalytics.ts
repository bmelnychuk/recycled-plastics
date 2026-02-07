import z from 'zod';

const AnalyticsEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  eventDate: z.iso.date(),
});

export const ViewedTargetSchema = z.object({
  type: z.enum(['company', 'demand', 'supply']),
  companyId: z.uuid(),
  targetId: z.uuid(),
});

export const ItemViewedEventSchema = AnalyticsEventSchema.extend({
  type: z.literal('ItemViewed'),
  payload: z.object({
    visitor: z.object({
      id: z.uuid(),
      companyId: z.uuid().optional(),
    }),
    target: ViewedTargetSchema,
  }),
});

export const ViewsAnalyticsDataSchema = z.object({
  target: ViewedTargetSchema,
  data: z.array(
    z.object({
      date: z.iso.date(),
      views: z.number(),
    }),
  ),
});

export type ViewsAnalyticsData = z.infer<typeof ViewsAnalyticsDataSchema>;
export type ViewedTarget = z.infer<typeof ViewedTargetSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type ItemViewedEvent = z.infer<typeof ItemViewedEventSchema>;
