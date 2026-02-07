import z from 'zod';
import { assertCanAccessCompany, CompanyUser } from '../../auth/User';
import {
  MaterialDemand,
  MaterialDemandSchema,
} from '../../../domain/material/demand/Demand';
import { MaterialDemandRepository } from '../../../domain/material/demand/MaterialDemandRepository';


export const MaterialDemandUpdateSchema = MaterialDemandSchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  companyId: z.uuid().optional(),
});

export type MaterialDemandUpdate = z.infer<typeof MaterialDemandUpdateSchema>;

export class UpdateMaterialDemand {
  constructor(
    private readonly materialDemandRepository: MaterialDemandRepository,
  ) { }

  public async invoke(
    user: CompanyUser,
    materialDemandUpdate: MaterialDemandUpdate,
  ): Promise<MaterialDemand> {
    const companyId = materialDemandUpdate.companyId ?? user.companyId;
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
