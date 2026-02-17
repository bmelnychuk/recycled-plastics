import { MessageRepository } from '../../../domain/communication/MessageRepository';
import {
  assertCanAccessCompany,
  assertCompanyUser,
  SignedInUser,
} from '../../auth/AuthService';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { MessageThreadViewModel } from '../../view-models';

export class GetCompanyMessageThreads {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    companyId?: string,
  ): Promise<MessageThreadViewModel[]> {
    const companyUser = assertCompanyUser(user);
    companyId = companyId ?? companyUser.companyId;
    assertCanAccessCompany(user, companyId);

    const threads =
      await this.messageRepository.getThreadsByCompanyId(companyId);

    const companyIds = new Set(
      threads
        .map((thread) => [thread.from.companyId, thread.to.companyId])
        .flat(),
    );
    const companies = await this.companyRepository.getByIds(
      Array.from(companyIds),
    );

    return threads
      .map((thread) => {
        const fromCompany = companies.get(thread.from.companyId);
        const toCompany = companies.get(thread.to.companyId);

        if (!fromCompany || !toCompany) return undefined;
        if (!fromCompany.verified || !toCompany.verified) return undefined;

        return {
          ...thread,
          from: { ...thread.from, company: fromCompany },
          to: { ...thread.to, company: toCompany },
        };
      })
      .filter(
        (thread): thread is MessageThreadViewModel => thread !== undefined,
      );
  }
}
