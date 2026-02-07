import {
  Company,
  CompanySchema
} from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { User } from '../../auth/User';
import { newUuid } from '../../../lib/identity';
import { UserRepository } from '../../../domain/user/UserRepository';
import { UserSchema } from '../../../domain/user/User';
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
    private readonly userRepository: UserRepository,
  ) { }

  public async invoke(user: User, newCompany: NewCompany): Promise<Company> {
    if (!user.isAdmin) {
      return this.createUnverifiedCompany(user, newCompany);
    }

    const now = new Date().toISOString();
    const company = CompanySchema.parse({
      ...newCompany,
      id: newCompany.id ?? newUuid(),
      createdDate: now,
      updatedDate: now,
    });

    await this.companyRepository.create(company);

    return company;
  }

  public async createUnverifiedCompany(
    user: User,
    newCompany: NewCompany,
  ): Promise<Company> {
    const userRecord = await this.userRepository.getById(user.id);
    if (user.companyId || userRecord.companyId)
      throw new Error('User already belongs to a company');

    const now = new Date().toISOString();
    const company = CompanySchema.parse({
      ...newCompany,
      id: newCompany.id ?? newUuid(),
      createdDate: now,
      updatedDate: now,
      verified: false,
    });

    const updatedUser = UserSchema.parse({
      ...userRecord,
      companyId: company.id,
    });

    await Promise.all([
      this.userRepository.update(updatedUser),
      this.companyRepository.create(company),
    ]);

    return company;
  }
}
