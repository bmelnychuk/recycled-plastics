import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import {
  assertCanAccessCompany,
  AuthService,
  SignedInUser,
} from '../../auth/AuthService';

export class GetCompanyUsers {
  constructor(
    private readonly authService: AuthService,
    private readonly companyRepository: CompanyRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    companyId: string,
  ): Promise<SignedInUser[]> {
    assertCanAccessCompany(user, companyId);
    const company = await this.companyRepository.getById(companyId);
    const userIds = company.userIds ?? [];
    const users = await this.authService.getByExternalIds(userIds);
    return users;
  }
}
