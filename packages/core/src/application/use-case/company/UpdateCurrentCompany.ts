import { Company, CompanySchema } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { assertCanAccessCompany, SignedInUser } from '../../auth/AuthService';
import { z } from 'zod';

export const CurrentCompanyUpdateSchema = CompanySchema.omit({
  createdDate: true,
  updatedDate: true,
  verified: true,
  id: true,
});

export type CurrentCompanyUpdate = z.infer<typeof CurrentCompanyUpdateSchema>;

export class UpdateCurrentCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async invoke(
    user: SignedInUser,
    companyUpdate: CurrentCompanyUpdate,
  ): Promise<Company> {
    const companyId = user.companyId;
    if (!companyId) throw new Error('User not associated to a company');
    assertCanAccessCompany(user, companyId);

    const existingCompany = await this.companyRepository.getById(companyId);

    if (existingCompany.verified) {
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
