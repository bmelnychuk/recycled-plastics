import { Company, CompanySchema } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertCanAccessCompany, SignedInUser } from '../../auth/AuthService';
import { z } from 'zod';

export const CompanyUpdateSchema = CompanySchema.omit({
  createdDate: true,
  updatedDate: true,
});

export type CompanyUpdate = z.infer<typeof CompanyUpdateSchema>;

export class UpdateCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async invoke(
    user: SignedInUser,
    companyUpdate: CompanyUpdate,
  ): Promise<Company> {
    const companyId = companyUpdate.id ?? user.companyId;
    assertCanAccessCompany(user, companyId);

    const existingCompany = await this.companyRepository.getById(companyId);

    if (!user.isAdmin && existingCompany.verified) {
      throw new Error('Only admins can update verified companies');
    }

    const company = CompanySchema.parse({
      ...existingCompany,
      ...companyUpdate,
      updatedDate: new Date().toISOString(),
    });

    await this.companyRepository.update(company);

    return company;
  }
}
