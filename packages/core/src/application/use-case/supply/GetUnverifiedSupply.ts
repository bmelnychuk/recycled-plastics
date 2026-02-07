import { MaterialSupplyRepository } from '../../../domain/material/supply/MaterialSupplyRepository';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertIsAdmin, User } from '../../auth/User';
import { SupplyViewModel } from '../../view-model/ViewModels';

export class GetUnverifiedSupply {
  constructor(
    private readonly supplyRepository: MaterialSupplyRepository,
    private readonly companyRepository: CompanyRepository,
  ) { }

  async invoke(user: User): Promise<SupplyViewModel[]> {
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
