import {
  assertCanAccessCompany,
  assertUserAndCompanyVerified,
  CompanyUser,
  SignedInUser,
} from '../../auth/AuthService';
import {
  MaterialSupply,
  MaterialSupplySchema,
} from '../../../domain/supply/Supply';
import { MaterialSupplyRepository } from '../../../domain/supply/MaterialSupplyRepository';
import z from 'zod';

export const SupplyUpdateSchema = MaterialSupplySchema.omit({
  createdDate: true,
  updatedDate: true,
});

export type SupplyUpdate = z.infer<typeof SupplyUpdateSchema>;

export class UpdateSupply {
  constructor(
    private readonly materialSupplyRepository: MaterialSupplyRepository,
  ) {}

  public async invoke(
    user: SignedInUser,
    supplyUpdate: SupplyUpdate,
  ): Promise<MaterialSupply> {
    assertUserAndCompanyVerified(user);
    assertCanAccessCompany(user, supplyUpdate.companyId);

    const existing = await this.materialSupplyRepository.getById(
      supplyUpdate.companyId,
      supplyUpdate.id,
    );

    const supply = MaterialSupplySchema.parse({
      ...existing,
      ...supplyUpdate,
      updatedDate: new Date().toISOString(),
      verified: user.isAdmin ? supplyUpdate.verified : false,
    });

    await this.materialSupplyRepository.update(supply);
    return supply;
  }
}
