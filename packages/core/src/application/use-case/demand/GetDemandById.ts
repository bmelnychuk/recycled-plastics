import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { User } from '../../auth/User';
import { MaterialDemandRepository } from '../../../domain/material/demand/MaterialDemandRepository';
import { DemandViewModel } from '../../view-model/ViewModels';

export class GetDemandById {
  constructor(
    private readonly demandRepository: MaterialDemandRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user?: User;
    id: {
      companyId: string;
      demandId: string;
    };
  }): Promise<DemandViewModel> {
    const { user, id } = input;
    const { companyId, demandId } = id;

    const demand = await this.demandRepository.getById(companyId, demandId);

    const company = user
      ? await this.companyRepository.getById(companyId)
      : undefined;

    return {
      ...demand,
      company,
      documents: user ? demand.documents : [],
    };
  }
}
