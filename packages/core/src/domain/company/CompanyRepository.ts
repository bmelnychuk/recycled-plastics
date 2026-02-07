import { Company, CompanyDetails } from './Company';

export interface CompanyRepository {
  getById(id: string): Promise<Company>;
  getByIds(ids: string[]): Promise<Map<string, Company>>;
  getDetailsById(id: string): Promise<CompanyDetails>;
  getVerifiedCompanies(): Promise<Company[]>;
  getUnverifiedCompanies(): Promise<Company[]>;
  getAll(): Promise<Company[]>;
  create(company: Company): Promise<void>;
  update(company: Company): Promise<void>;
  delete(companyId: string): Promise<void>;
}
