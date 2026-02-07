import { assertCanAccessCompany, User } from '../../auth/User';
import { MaterialSupplyRepository } from '../../../domain/material/supply/MaterialSupplyRepository';

export class DeleteSupply {
  constructor(private readonly supplyRepository: MaterialSupplyRepository) {}

  public async invoke(
    user: User,
    id: { companyId: string; supplyId: string },
  ): Promise<void> {
    const { companyId, supplyId } = id;
    assertCanAccessCompany(user, companyId);
    await this.supplyRepository.delete(companyId, supplyId);
  }
}
