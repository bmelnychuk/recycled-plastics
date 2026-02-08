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
    const companies = user
      ? await this.companyRepository.getByIds(companyIds)
      : new Map();

    return supply.map((s) => ({
      ...s,
      company: companies.get(s.companyId),
      documents: user ? s.documents : [],
    }));
  }
}
