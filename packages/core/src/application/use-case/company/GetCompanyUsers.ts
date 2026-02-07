import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { UserRepository } from '../../../domain/user/UserRepository';
import { assertCanAccessCompany, assertIsAdmin, User } from '../../auth/User';

import { User as DomainUser } from '../../../domain/user/User';
import { UserViewModel } from '../../view-model/ViewModels';

export class GetCompanyUsers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async invoke(user: User, companyId: string): Promise<UserViewModel[]> {
    assertCanAccessCompany(user, companyId);

    const company = await this.companyRepository.getById(companyId);
    const users = await this.userRepository.getByCompanyId(companyId);
    return users.map((u: DomainUser) => ({ ...u, company }));
  }
}
