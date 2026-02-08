import { assertCanAccessCompany, SignedInUser } from '../../auth/AuthService';
import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';

export class DeleteSupply {
  constructor(private readonly supplyRepository: MaterialSupplyRepository) {}

  public async invoke(
    user: SignedInUser,
    id: { companyId: string; supplyId: string },
  ): Promise<void> {
    const { companyId, supplyId } = id;
    assertCanAccessCompany(user, companyId);
    await this.supplyRepository.delete(companyId, supplyId);
  }
}
