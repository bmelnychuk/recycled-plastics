import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';
import {
  assertCanAccessCompany,
  assertCreateMaterialPermission,
  SignedInUser,
} from '../../auth/AuthService';
import {
  MaterialSupply,
  MaterialSupplySchema,
} from '../../../domain/supply/Supply';
import { newUuid } from '../../../lib/identity';
import z from 'zod';

export const NewMaterialSupplySchema = MaterialSupplySchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  id: z.uuid().optional(),
});

export type NewMaterialSupply = z.infer<typeof NewMaterialSupplySchema>;

export class CreateSupply {
  constructor(private readonly supplyRepository: MaterialSupplyRepository) {}

  public async invoke(
    user: SignedInUser,
    newSupply: NewMaterialSupply,
  ): Promise<MaterialSupply> {
    assertCreateMaterialPermission(user);
    assertCanAccessCompany(user, newSupply.companyId);
    const now = new Date().toISOString();

    const supply: MaterialSupply = MaterialSupplySchema.parse({
      ...newSupply,
      id: newSupply.id ?? newUuid(),
      createdDate: now,
      updatedDate: now,
    });

    assertCanAccessCompany(user, supply.companyId);
    await this.supplyRepository.create(supply);

    return supply;
  }
}
