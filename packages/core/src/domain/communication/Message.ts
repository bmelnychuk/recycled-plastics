import { z } from 'zod';

export const MessageThreadTopicSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('demand'),
    companyId: z.uuid(),
    id: z.uuid(),
  }),
  z.object({
    type: z.literal('supply'),
    companyId: z.uuid(),
    id: z.uuid(),
  }),
]);

export const MessageSchema = z.object({
  id: z.uuid(),
  threadId: z.uuid(),
  body: z.string(),
  createdDate: z.iso.datetime(),
  createdBy: z.object({
    companyId: z.uuid(),
    userId: z.uuid(),
  }),
});

export const MessageThreadSchema = z.object({
  id: z.uuid(),
  createdDate: z.iso.datetime(),
  updatedDate: z.iso.datetime(),
  topic: MessageThreadTopicSchema,
  from: z.object({
    companyId: z.uuid(),
  }),
  to: z.object({
    companyId: z.uuid(),
  }),
  lastMessage: MessageSchema,
  hasUnreadMessages: z.boolean(),
});

export type Message = z.infer<typeof MessageSchema>;
export type MessageThread = z.infer<typeof MessageThreadSchema>;
