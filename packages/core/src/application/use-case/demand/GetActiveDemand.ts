import { MaterialDemand } from '../../../domain/demand/Demand';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { SignedInUser } from '../../auth/AuthService';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';

export class GetActiveDemand {
  constructor(
    private readonly demandRepository: MaterialDemandRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user?: SignedInUser;
    startDate?: Date;
  }): Promise<MaterialDemand[]> {
    const { user, startDate } = input;
    const demand = await this.demandRepository.getActiveDemand(startDate);

    const companyIds = demand.map(({ companyId }) => companyId);
    const companies = await this.companyRepository.getByIds(companyIds);

    return demand
      .filter((d) => user?.isAdmin || user?.companyId === d.companyId || d.verified)
      .map((d) => {
        const company = companies.get(d.companyId);
        if (!company || !company.verified) return undefined;

        return {
          ...d,
          company: user ? company : undefined,
          documents: user ? d.documents : [],
        };
      })
      .filter((d) => !!d);
  }
}
