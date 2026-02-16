import z from 'zod';
import { MessageRepository } from '../../../domain/communication/MessageRepository';
import {
  assertCompanyUser,
  assertUserAndCompanyVerified,
  SignedInUser,
} from '../../auth/AuthService';
import { newUuid } from '../../../lib/identity';
import {
  MessageSchema,
  MessageThreadSchema,
} from '../../../domain/communication/Message';

const ExistingThreadSchema = z.object({
  type: z.literal('existing'),
  id: z.uuid(),
});

const NewThreadSchema = MessageThreadSchema.pick({
  topic: true,
  to: true,
}).extend({
  type: z.literal('new'),
});

export const NewMessageSchema = z.object({
  thread: z.discriminatedUnion('type', [ExistingThreadSchema, NewThreadSchema]),
  body: z.string(),
});

export type NewMessage = z.infer<typeof NewMessageSchema>;

export class WriteMessage {
  constructor(private readonly messageRepository: MessageRepository) {}

  public async invoke(user: SignedInUser, message: NewMessage): Promise<void> {
    assertUserAndCompanyVerified(user);

    if (message.thread.type === 'existing') {
      return this.writeToExistingThread(user, message);
    } else {
      return this.startNewThread(user, message);
    }
  }

  private async startNewThread(
    user: SignedInUser,
    message: NewMessage,
  ): Promise<void> {
    if (message.thread.type !== 'new')
      throw new Error('Expected new thread type');
    const companyUser = assertCompanyUser(user);

    const now = new Date().toISOString();
    const threadId = newUuid();

    const newMessage = MessageSchema.parse({
      id: newUuid(),
      threadId,
      createdDate: now,
      body: message.body,
      createdBy: {
        companyId: companyUser.companyId,
        userId: companyUser.id,
      },
    });

    const thread = MessageThreadSchema.parse({
      id: threadId,
      createdDate: now,
      updatedDate: now,
      topic: message.thread.topic,
      from: { companyId: companyUser.companyId },
      to: { companyId: message.thread.to.companyId },
      lastMessage: newMessage,
      hasUnreadMessages: false,
    });

    await this.messageRepository.saveMessage(newMessage);
    await this.messageRepository.saveThread(thread);
  }

  private async writeToExistingThread(
    user: SignedInUser,
    message: NewMessage,
  ): Promise<void> {
    if (message.thread.type !== 'existing')
      throw new Error('Expected existing thread type');
    const companyUser = assertCompanyUser(user);

    const now = new Date().toISOString();
    const threadId = message.thread.id;

    const thread = await this.messageRepository.getThreadById(
      companyUser.companyId,
      threadId,
    );
    const newMessage = MessageSchema.parse({
      id: newUuid(),
      threadId,
      createdDate: now,
      body: message.body,
      createdBy: {
        companyId: companyUser.companyId,
        userId: companyUser.id,
      },
    });

    const updatedThread = MessageThreadSchema.parse({
      ...thread,
      lastMessage: newMessage,
      updatedDate: now,
      hasUnreadMessages: true,
    });

    await this.messageRepository.saveMessage(newMessage);
    await this.messageRepository.saveThread(updatedThread);
  }
}
