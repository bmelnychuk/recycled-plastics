import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';
import { assertUser, SignedInUser } from '../../auth/AuthService';
import { DemandViewModel } from '../../view-models';

export class GetCompanyDemand {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly demandRepository: MaterialDemandRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    companyId: string,
  ): Promise<DemandViewModel[]> {
    assertUser(user);
    const [company, demand] = await Promise.all([
      this.companyRepository.getById(companyId),
      this.demandRepository.getByCompanyId(companyId),
    ]);
    const isCompanyUser = user.companyId === companyId || user.isAdmin;

    return demand
      .filter((d) => isCompanyUser || d.verified)
      .map((d) => ({ ...d, company }));
  }
}
