import { assertCanAccessCompany, CompanyUser } from '../../auth/User';
import {
  MaterialSupply,
  MaterialSupplySchema
} from '../../../domain/material/supply/Supply';
import { MaterialSupplyRepository } from '../../../domain/material/supply/MaterialSupplyRepository';
import z from 'zod';

export const MaterialSupplyUpdateSchema = MaterialSupplySchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  companyId: z.uuid().optional(),
});

export type MaterialSupplyUpdate = z.infer<typeof MaterialSupplyUpdateSchema>;

export class UpdateMaterialSupply {
  constructor(
    private readonly materialSupplyRepository: MaterialSupplyRepository,
  ) { }

  public async invoke(
    user: CompanyUser,
    materialSupplyUpdate: MaterialSupplyUpdate,
  ): Promise<MaterialSupply> {
    const companyId = materialSupplyUpdate.companyId ?? user.companyId;
    assertCanAccessCompany(user, companyId);

    const existing = await this.materialSupplyRepository.getById(
      companyId,
      materialSupplyUpdate.id,
    );

    const supply = MaterialSupplySchema.parse({
      ...existing,
      ...materialSupplyUpdate,
      updatedDate: new Date().toISOString(),
      verified: user.isAdmin ? materialSupplyUpdate.verified : false,
    });

    await this.materialSupplyRepository.update(supply);
    return supply;
  }
}
