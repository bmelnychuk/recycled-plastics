import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';
import { assertUser, SignedInUser } from '../../auth/AuthService';
import { SupplyViewModel } from '../../view-models';

export class GetCompanySupply {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly supplyRepository: MaterialSupplyRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    companyId: string,
  ): Promise<SupplyViewModel[]> {
    assertUser(user);

    const isCompanyUser = user.companyId === companyId || user.isAdmin;

    const [company, supply] = await Promise.all([
      this.companyRepository.getById(companyId),
      this.supplyRepository.getByCompanyId(companyId),
    ]);

    return supply
      .filter((s) => isCompanyUser || s.verified)
      .map((s) => ({ ...s, company }));
  }
}
