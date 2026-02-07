import { MaterialDemand } from '../../../domain/material/demand/Demand';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { User } from '../../auth/User';
import { MaterialDemandRepository } from '../../../domain/material/demand/MaterialDemandRepository';

export class GetActiveDemand {
  constructor(
    private readonly demandRepository: MaterialDemandRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user?: User;
    startDate?: Date;
  }): Promise<MaterialDemand[]> {
    const { user, startDate } = input;
    const demand = await this.demandRepository.getActiveDemand(startDate);
    const companyIds = demand.map(({ companyId }) => companyId);
    const companies = user
      ? await this.companyRepository.getByIds(companyIds)
      : new Map();

    return demand.map((d) => ({
      ...d,
      company: companies.get(d.companyId),
      documents: user ? d.documents : [],
    }));
  }
}
