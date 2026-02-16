import { Message, MessageThread } from './Message';

export interface MessageRepository {
  saveThread(thread: MessageThread): Promise<void>;
  saveMessage(message: Message): Promise<void>;
  getMessagesByThreadId(threadId: string): Promise<Message[]>;
  getThreadById(companyId: string, threadId: string): Promise<MessageThread>;
  getThreadsByCompanyId(companyId: string): Promise<MessageThread[]>;
}
