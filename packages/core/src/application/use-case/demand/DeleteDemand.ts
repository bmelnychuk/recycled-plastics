import { assertCanAccessCompany, SignedInUser } from '../../auth/AuthService';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';

export class DeleteDemand {
  constructor(
    private readonly materialDemandRepository: MaterialDemandRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    id: { companyId: string; demandId: string },
  ): Promise<void> {
    const { companyId, demandId } = id;
    assertCanAccessCompany(user, companyId);
    await this.materialDemandRepository.delete(companyId, demandId);
  }
}
