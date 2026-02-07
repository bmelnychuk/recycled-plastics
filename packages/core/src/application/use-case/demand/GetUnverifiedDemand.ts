import { MaterialDemand } from '../../../domain/material/demand/Demand';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertIsAdmin, User } from '../../auth/User';
import { MaterialDemandRepository } from '../../../domain/material/demand/MaterialDemandRepository';

export class GetUnverifiedDemand {
  constructor(
    private readonly demandRepository: MaterialDemandRepository,
    private readonly companyRepository: CompanyRepository,
  ) { }

  async invoke(user: User): Promise<MaterialDemand[]> {
    assertIsAdmin(user);
    const demand = await this.demandRepository.getUnverifiedDemand();
    const companyIds = demand.map(({ companyId }) => companyId);
    const companies = await this.companyRepository.getByIds(companyIds);

    return demand.map((demand) => ({
      ...demand,
      company: companies.get(demand.companyId),
    }));
  }
}
