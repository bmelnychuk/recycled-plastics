import { MaterialDemand } from '../../../domain/demand/Demand';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertIsAdmin, SignedInUser } from '../../auth/AuthService';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';

export class GetUnverifiedDemand {
  constructor(
    private readonly demandRepository: MaterialDemandRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(user: SignedInUser): Promise<MaterialDemand[]> {
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
