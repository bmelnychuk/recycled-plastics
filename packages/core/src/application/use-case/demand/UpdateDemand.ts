import z from 'zod';
import {
  assertCanAccessCompany,
  assertUserAndCompanyVerified,
  CompanyUser,
  SignedInUser,
} from '../../auth/AuthService';
import {
  MaterialDemand,
  MaterialDemandSchema,
} from '../../../domain/demand/Demand';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';

export const MaterialDemandUpdateSchema = MaterialDemandSchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  companyId: z.uuid().optional(),
});

export type MaterialDemandUpdate = z.infer<typeof MaterialDemandUpdateSchema>;

export class UpdateDemand {
  constructor(
    private readonly materialDemandRepository: MaterialDemandRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    materialDemandUpdate: MaterialDemandUpdate,
  ): Promise<MaterialDemand> {
    assertUserAndCompanyVerified(user);
    const companyId = materialDemandUpdate.companyId ?? user.companyId;
    if (!companyId) throw new Error('Company ID is required');

    assertCanAccessCompany(user, companyId);

    const existing = await this.materialDemandRepository.getById(
      companyId,
      materialDemandUpdate.id,
    );

    const materialDemand = MaterialDemandSchema.parse({
      ...existing,
      ...materialDemandUpdate,
      updatedDate: new Date().toISOString(),
      verified: user.isAdmin ? materialDemandUpdate.verified : false,
    });

    await this.materialDemandRepository.update(materialDemand);
    return materialDemand;
  }
}
