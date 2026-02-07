import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { UserViewModel } from '../../view-model/ViewModels';
import { UserRepository } from '../../../domain/user/UserRepository';

import { User as SessionUser } from '../../auth/User';

export class GetUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user: SessionUser;
    requestedUserId: string;
  }): Promise<UserViewModel> {
    const { user: sessionUser, requestedUserId } = input;
    const { isAdmin, id: sessionUserId } = sessionUser;

    const user = await this.userRepository.getById(requestedUserId);

    const canAccessCompany = isAdmin || sessionUserId === requestedUserId;

    const company =
      canAccessCompany && user.companyId
        ? await this.companyRepository.getById(user.companyId)
        : undefined;

    return { ...user, company };
  }
}
