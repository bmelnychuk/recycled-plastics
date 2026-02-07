import { UserRepository } from '../../../domain/user/UserRepository';
import { assertIsAdmin, User } from '../../auth/User';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { Company } from '../../../domain/company/Company';
import { UserViewModel } from '../../view-model/ViewModels';

export class GetUsers {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository
  ) { }

  public async invoke(user: User): Promise<UserViewModel[]> {
    assertIsAdmin(user);
    const verifiedCompanies = await this.companyRepository.getVerifiedCompanies();
    const unverifiedCompanies = await this.companyRepository.getUnverifiedCompanies();

    const companies = new Map<string, Company>();
    verifiedCompanies.forEach((company) => companies.set(company.id, company));
    unverifiedCompanies.forEach((company) => companies.set(company.id, company));

    const users = await this.userRepository.getAll();
    return users.map((user) => {
      const company = user.companyId ? companies.get(user.companyId) : undefined;
      return ({ ...user, company });
    });
  }
}
