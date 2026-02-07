import { Company, CompanySchema } from '../../../domain/company/Company';
import { CompanyRepository } from '../../../domain/company/CompanyRepository';
import { UserRepository } from '../../../domain/user/UserRepository';
import { assertIsAdmin, User } from '../../auth/User';
import { UserSchema } from '../../../domain/user/User';
import z from 'zod';

export const ApproveCompanyInputSchema = z.object({
  companyId: z.string(),
  verifiedCompanyId: z.string().optional(),
});

export type ApproveCompanyInput = z.infer<typeof ApproveCompanyInputSchema>;

export class ApproveCompany {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(
    user: User,
    input: ApproveCompanyInput,
  ): Promise<Company> {
    assertIsAdmin(user);

    const { companyId, verifiedCompanyId } = input;

    // similar company alredy exists
    if (verifiedCompanyId) {
      const company = await this.companyRepository.getById(verifiedCompanyId);
      if (!company.verified)
        throw new Error(`Company ${company.id} is not verified`);

      const users = await this.userRepository.getByCompanyId(company.id);

      await Promise.all(
        users.map((user) =>
          this.userRepository.update(
            UserSchema.parse({ ...user, companyId: company.id }),
          ),
        ),
      );

      await this.companyRepository.delete(company.id);

      return company;
    } else {
      const company = await this.companyRepository.getById(companyId);
      const verifiedCompany = CompanySchema.parse({
        ...company,
        verified: true,
      });
      await this.companyRepository.update(verifiedCompany);

      return verifiedCompany;
    }
  }
}
