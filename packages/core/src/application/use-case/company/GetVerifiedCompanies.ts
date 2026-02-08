import { Company } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertIsAdmin, SignedInUser } from '../../auth/AuthService';

export class GetVerifiedCompanies {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async invoke(user: SignedInUser): Promise<Company[]> {
    assertIsAdmin(user);
    return this.companyRepository.getVerifiedCompanies();
  }
}
