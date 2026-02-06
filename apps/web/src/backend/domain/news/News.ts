import { z } from 'zod';

export const NewsSchema = z.object({
  id: z.uuid(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  link: z.url(),
});

export type News = z.infer<typeof NewsSchema>;
