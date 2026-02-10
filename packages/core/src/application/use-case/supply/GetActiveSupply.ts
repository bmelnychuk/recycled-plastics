import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { SignedInUser } from '../../auth/AuthService';
import { SupplyViewModel } from '../../view-models';

export class GetActiveSupply {
  constructor(
    private readonly supplyRepository: MaterialSupplyRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user?: SignedInUser;
    startDate?: Date;
  }): Promise<SupplyViewModel[]> {
    const { user, startDate } = input;
    const supply = await this.supplyRepository.getActiveSupply(startDate);
    const companyIds = supply.map(({ companyId }) => companyId);

    const companies = await this.companyRepository.getByIds(companyIds);

    return supply
      .filter(
        (s) => user?.isAdmin || user?.companyId === s.companyId || s.verified,
      )
      .map((s) => {
        const company = companies.get(s.companyId);
        if (!company || !company.verified) return undefined;

        return {
          ...s,
          company: user ? company : undefined,
          documents: user ? s.documents : [],
        };
      })
      .filter((s) => !!s);
  }
}
