import { Company } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertUser, SignedInUser } from '../../auth/AuthService';

export class GetCompanyById {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public invoke(user: SignedInUser, companyId: string): Promise<Company> {
    assertUser(user);
    return this.companyRepository.getDetailsById(companyId);
  }
}
