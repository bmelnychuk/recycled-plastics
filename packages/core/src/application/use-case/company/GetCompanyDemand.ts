import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { MaterialDemandRepository } from '../../../domain/material/demand/MaterialDemandRepository';
import { DemandViewModel } from '../../view-model/ViewModels';

export class GetCompanyDemand {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly demandRepository: MaterialDemandRepository,
  ) {}

  public async invoke(companyId: string): Promise<DemandViewModel[]> {
    const [company, demand] = await Promise.all([
      this.companyRepository.getById(companyId),
      this.demandRepository.getByCompanyId(companyId),
    ]);

    return demand.map((d) => ({ ...d, company }));
  }
}
