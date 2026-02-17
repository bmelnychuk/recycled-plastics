import { MessageRepository } from '../../../domain/communication/MessageRepository';
import {
  assertCanAccessCompany,
  assertCompanyUser,
  SignedInUser,
} from '../../auth/AuthService';
import { MessageViewModel } from '../../view-models';
import { UserRepository } from '../../../domain/user/UserRepository';
import { MessageThreadTopic } from '../../../domain/communication/Message';

export class GetMessagesByTopic {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    ids: { companyId?: string; topic: MessageThreadTopic },
  ): Promise<MessageViewModel[]> {
    const companyUser = assertCompanyUser(user);
    const companyId = ids.companyId ?? companyUser.companyId;
    assertCanAccessCompany(companyUser, companyId);

    const companyThreads =
      await this.messageRepository.getThreadsByCompanyId(companyId);
    const thread = companyThreads.find(
      ({ topic }) =>
        topic.type === ids.topic.type &&
        topic.companyId === ids.topic.companyId &&
        topic.id === ids.topic.id,
    );

    if (!thread) return [];

    const messages = await this.messageRepository.getMessagesByThreadId(
      thread.id,
    );

    const userIds = new Set(
      messages.map((message) => message.createdBy.userId),
    );
    const users = await this.userRepository.getByIds(Array.from(userIds));

    return messages.map((message) => {
      const user = users.get(message.createdBy.userId);
      return {
        ...message,
        createdBy: { ...message.createdBy, user },
      };
    });
  }
}
