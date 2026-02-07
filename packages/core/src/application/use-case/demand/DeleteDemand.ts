import { assertCanAccessCompany, User } from '../../auth/User';
import { MaterialDemandRepository } from '../../../domain/material/demand/MaterialDemandRepository';

export class DeleteDemand {
  constructor(
    private readonly materialDemandRepository: MaterialDemandRepository,
  ) {}

  public async invoke(
    user: User,
    id: { companyId: string; demandId: string },
  ): Promise<void> {
    const { companyId, demandId } = id;
    assertCanAccessCompany(user, companyId);
    await this.materialDemandRepository.delete(companyId, demandId);
  }
}
