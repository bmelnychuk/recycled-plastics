import { CompanyRepository } from '../../../domain/company/CompanyRepository';

import { MaterialSupplyRepository } from '../../../domain/material/supply/MaterialSupplyRepository';
import { MaterialSupply } from '../../../domain/material/supply/Supply';
import { SupplyViewModel } from '../../view-model/ViewModels';

export class GetCompanySupply {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly supplyRepository: MaterialSupplyRepository,
  ) {}

  public async invoke(companyId: string): Promise<SupplyViewModel[]> {
    const [company, supply] = await Promise.all([
      this.companyRepository.getById(companyId),
      this.supplyRepository.getByCompanyId(companyId),
    ]);

    return supply.map((s: MaterialSupply) => ({ ...s, company }));
  }
}
