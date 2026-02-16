import { Company, CompanySchema } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { SignedInUser, AuthService } from '../../auth/AuthService';
import { newUuid } from '../../../lib/identity';
import { z } from 'zod';

export const NewCompanySchema = CompanySchema.omit({
  createdDate: true,
  updatedDate: true,
}).extend({
  id: z.uuid().optional(),
  verified: z.boolean().optional(),
});

export type NewCompany = z.infer<typeof NewCompanySchema>;

export class CreateCompany {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly authService: AuthService,
  ) {}

  public async invoke(
    user: SignedInUser,
    newCompany: NewCompany,
  ): Promise<Company> {
    if (!user.isAdmin) {
      return this.createUnverifiedCompany(user, newCompany);
    } else {
      const now = new Date().toISOString();
      const company = CompanySchema.parse({
        ...newCompany,
        id: newCompany.id ?? newUuid(),
        createdDate: now,
        updatedDate: now,
        userIds: [],
      });

      await this.companyRepository.create(company);
      return company;
    }
  }

  public async createUnverifiedCompany(
    user: SignedInUser,
    newCompany: NewCompany,
  ): Promise<Company> {
    if (user.companyId) throw new Error('User already belongs to a company');

    const now = new Date().toISOString();
    const company = CompanySchema.parse({
      ...newCompany,
      id: newCompany.id ?? newUuid(),
      createdDate: now,
      updatedDate: now,
      verified: false,
      userIds: [user.authId],
    });

    await this.authService.updateUser(user.authId, {
      externalId: newUuid(),
      companyId: company.id,
      isCompanyVerified: false,
    });

    await this.companyRepository.create(company);
    return company;
  }
}
