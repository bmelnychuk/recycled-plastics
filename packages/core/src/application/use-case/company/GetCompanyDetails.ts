import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { UserRepository } from '../../../domain/user/UserRepository';
import { CompanyViewModel } from '../../view-model/ViewModels';

export class GetCompanyDetails {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(companyId: string): Promise<CompanyViewModel> {
    const [company, contacts] = await Promise.all([
      this.companyRepository.getDetailsById(companyId),
      this.userRepository.getByCompanyId(companyId),
    ]);
    const mainContact = contacts[0];
    return { ...company, mainContact };
  }
}
