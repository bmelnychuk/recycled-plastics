import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { User } from '../../../domain/user/User';
import { UserRepository } from '../../../domain/user/UserRepository';
import { assertCanAccessCompany, SignedInUser } from '../../auth/AuthService';

export class GetCompanyUsers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async invoke(user: SignedInUser, companyId: string): Promise<User[]> {
    assertCanAccessCompany(user, companyId);
    const company = await this.companyRepository.getById(companyId);
    const userIds = company.userIds ?? [];
    const users = await this.userRepository.findByAuthIds(userIds);
    return Array.from(users.values());
  }
}
