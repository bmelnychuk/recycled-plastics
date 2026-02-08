import z from 'zod';
import {
  assertCanAccessCompany,
  assertCreateMaterialPermission,
  SignedInUser,
} from '../../auth/AuthService';
import {
  MaterialDemand,
  MaterialDemandSchema,
} from '../../../domain/demand/Demand';
import { newUuid } from '../../../lib/identity';
import { MaterialDemandRepository } from '../../../domain/demand/MaterialDemandRepository';

export const NewMaterialDemandSchema = MaterialDemandSchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  id: z.uuid().optional(),
  companyId: z.uuid().optional(),
});

export type NewMaterialDemand = z.infer<typeof NewMaterialDemandSchema>;

export class CreateDemand {
  constructor(
    private readonly materialDemandRepository: MaterialDemandRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    newDemand: NewMaterialDemand,
  ): Promise<MaterialDemand> {
    assertCreateMaterialPermission(user);
    const now = new Date().toISOString();

    const demand: MaterialDemand = MaterialDemandSchema.parse({
      ...newDemand,
      id: newDemand.id ?? newUuid(),
      companyId: newDemand.companyId ?? user.companyId,
      createdDate: now,
      updatedDate: now,
    });

    assertCanAccessCompany(user, demand.companyId);
    await this.materialDemandRepository.create(demand);

    return demand;
  }
}
