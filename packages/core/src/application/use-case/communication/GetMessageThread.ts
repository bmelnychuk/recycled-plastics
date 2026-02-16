import { MessageRepository } from '../../../domain/communication/MessageRepository';
import {
  assertCanAccessCompany,
  assertCompanyUser,
  SignedInUser,
} from '../../auth/AuthService';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { MessageThreadViewModel } from '../../view-models';

export class GetMessageThread {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    ids: { companyId?: string; threadId: string },
  ): Promise<MessageThreadViewModel> {
    const companyUser = assertCompanyUser(user);
    const companyId = ids.companyId ?? companyUser.companyId;
    assertCanAccessCompany(user, companyId);

    const thread = await this.messageRepository.getThreadById(
      companyId,
      ids.threadId,
    );
    const companyIds = new Set([thread.from.companyId, thread.to.companyId]);
    const companies = await this.companyRepository.getByIds(
      Array.from(companyIds),
    );

    const fromCompany = companies.get(thread.from.companyId);
    const toCompany = companies.get(thread.to.companyId);

    if (!fromCompany || !toCompany) throw new Error('Company not found');

    return {
      ...thread,
      from: { ...thread.from, company: fromCompany },
      to: { ...thread.to, company: toCompany },
    };
  }
}
