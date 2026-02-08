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
  companyId: z.uuid().optional(),
});

export type NewMaterialSupply = z.infer<typeof NewMaterialSupplySchema>;

export class CreateSupply {
  constructor(private readonly supplyRepository: MaterialSupplyRepository) {}

  public async invoke(
    user: SignedInUser,
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
