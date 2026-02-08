import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertIsAdmin, SignedInUser } from '../../auth/AuthService';
import { SupplyViewModel } from '../../view-models';

export class GetUnverifiedSupply {
  constructor(
    private readonly supplyRepository: MaterialSupplyRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(user: SignedInUser): Promise<SupplyViewModel[]> {
    assertIsAdmin(user);

    const supply = await this.supplyRepository.getUnverifiedSupply();
    const companyIds = supply.map(({ companyId }) => companyId);
    const companies = await this.companyRepository.getByIds(companyIds);

    return supply.map((supply) => ({
      ...supply,
      company: companies.get(supply.companyId),
    }));
  }
}
