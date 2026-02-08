import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { SignedInUser } from '../../auth/AuthService';
import { SupplyViewModel } from '../../view-models';
import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';

export class GetSupplyById {
  constructor(
    private readonly supplyRepository: MaterialSupplyRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async invoke(input: {
    user?: SignedInUser;
    id: { companyId: string; supplyId: string };
  }): Promise<SupplyViewModel> {
    const { user, id } = input;
    const { companyId, supplyId } = id;

    const supply = await this.supplyRepository.getById(companyId, supplyId);

    const company = user
      ? await this.companyRepository.getById(companyId)
      : undefined;

    return { ...supply, company, documents: user ? supply.documents : [] };
  }
}
