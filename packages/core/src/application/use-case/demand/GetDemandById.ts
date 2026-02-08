import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { SignedInUser } from '../../auth/AuthService';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';
import { DemandViewModel } from '../../view-models';

export class GetDemandById {
  constructor(
    private readonly demandRepository: MaterialDemandRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user?: SignedInUser;
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
