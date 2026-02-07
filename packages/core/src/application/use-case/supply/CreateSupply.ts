import { MaterialSupplyRepository } from '../../../domain/material/supply/MaterialSupplyRepository';
import {
  assertCanAccessCompany,
  assertCreateMaterialPermission,
  User,
} from '../../auth/User';
import {
  MaterialSupply,
  MaterialSupplySchema
} from '../../../domain/material/supply/Supply';
import { newUuid } from '../../../lib/identity';
import z from 'zod';

export const NewMaterialSupplySchema = MaterialSupplySchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  id: z.uuid().optional(),
  companyId: z.uuid().optional(),
});

export type NewMaterialSupply = z.infer<typeof NewMaterialSupplySchema>;

export class CreateMaterialSupply {
  constructor(private readonly supplyRepository: MaterialSupplyRepository) { }

  public async invoke(
    user: User,
    newSupply: NewMaterialSupply,
  ): Promise<MaterialSupply> {
    assertCreateMaterialPermission(user);
    const now = new Date().toISOString();

    const supply: MaterialSupply = MaterialSupplySchema.parse({
      ...newSupply,
      id: newSupply.id ?? newUuid(),
      companyId: newSupply.companyId ?? user.companyId,
      createdDate: now,
      updatedDate: now,
    });

    assertCanAccessCompany(user, supply.companyId);
    await this.supplyRepository.create(supply);

    return supply;
  }
}
