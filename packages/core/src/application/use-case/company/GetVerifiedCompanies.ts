import { Company } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertIsAdmin, User } from '../../auth/User';

export class GetVerifiedCompanies {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async invoke(user: User): Promise<Company[]> {
    assertIsAdmin(user);
    return this.companyRepository.getVerifiedCompanies();
  }
}
