import { DynamoDbCompanyRepository } from './infrastructure/dynamo-db/DynamoDbCompanyRepository';
import { DynamoDbMaterialDemandRepository } from './infrastructure/dynamo-db/DynamoDbMaterialDemandRepository';
import { DynamoDbMaterialSupplyRepository } from './infrastructure/dynamo-db/DynamoDbMaterialSupplyRepository';
import { MaterialDemand } from './domain/demand/Demand';
import {
  SignedInUser,
  SignedInUserSchema,
} from './application/auth/AuthService';
import { GetActiveDemand } from './application/use-case/demand/GetActiveDemand';
import { GetActiveSupply } from './application/use-case/supply/GetActiveSupply';
import { MaterialSupply } from './domain/supply/Supply';
import { MaterialSupplyRepository } from './domain/supply/MaterialSupplyRepository';
import { CompanyRepository } from './domain/company/CompanyRepository';
import { MaterialDemandRepository } from './domain/demand/MaterialDemandRepository';
import { DemandViewModel, SupplyViewModel } from './application/view-models';
import { GetDemandById } from './application/use-case/demand/GetDemandById';
import { GetCompanyById } from './application/use-case/company/GetCompanyDetails';
import { Company } from './domain/company/Company';
import {
  MaterialDemandUpdate,
  UpdateDemand,
} from './application/use-case/demand/UpdateDemand';
import {
  CreateDemand,
  NewMaterialDemand,
} from './application/use-case/demand/CreateDemand';
import {
  CreateCompany,
  NewCompany,
  NewCompanySchema,
} from './application/use-case/company/CreateCompany';
import {
  CompanyUpdate,
  CompanyUpdateSchema,
  UpdateCompany,
} from './application/use-case/company/UpdateCompany';
import {
  CurrentCompanyUpdate,
  CurrentCompanyUpdateSchema,
  UpdateCurrentCompany,
} from './application/use-case/company/UpdateCurrentCompany';
import { GetVerifiedCompanies } from './application/use-case/company/GetVerifiedCompanies';
import { GetUnverifiedCompanies } from './application/use-case/company/GetUnverifiedCompanies';
import { GetSupplyById } from './application/use-case/supply/GetSupplyById';
import {
  SupplyUpdate,
  SupplyUpdateSchema,
  UpdateSupply,
} from './application/use-case/supply/UpdateSupply';
import {
  CreateSupply,
  NewMaterialSupply,
  NewMaterialSupplySchema,
} from './application/use-case/supply/CreateSupply';
import { GetCompanyDemand } from './application/use-case/company/GetCompanyDemand';
import { GetCompanySupply } from './application/use-case/company/GetCompanySupply';
import { GetUnverifiedDemand } from './application/use-case/demand/GetUnverifiedDemand';
import { GetUnverifiedSupply } from './application/use-case/supply/GetUnverifiedSupply';

export const { MAIN_TABLE, CLERK_SECRET_KEY } = process.env as Record<
  string,
  string
>;

export type GetCurrentUser = () => Promise<SignedInUser | undefined>;

export class Application {
  private readonly demand: MaterialDemandRepository;
  private readonly supply: MaterialSupplyRepository;
  private readonly companies: CompanyRepository;

  private readonly getActiveDemandUseCase: GetActiveDemand;
  private readonly getDemandByIdUseCase: GetDemandById;
  private readonly updateDemandUseCase: UpdateDemand;
  private readonly createDemandUseCase: CreateDemand;
  private readonly getCompanyDemandUseCase: GetCompanyDemand;
  private readonly getUnverifiedDemandUseCase: GetUnverifiedDemand;

  private readonly getActiveSupplyUseCase: GetActiveSupply;
  private readonly getSupplyByIdUseCase: GetSupplyById;
  private readonly updateSupplyUseCase: UpdateSupply;
  private readonly createSupplyUseCase: CreateSupply;
  private readonly getCompanySupplyUseCase: GetCompanySupply;
  private readonly getUnverifiedSupplyUseCase: GetUnverifiedSupply;

  private readonly getCompanyByIdUseCase: GetCompanyById;
  private readonly updateCompanyUseCase: UpdateCompany;
  private readonly createCompanyUseCase: CreateCompany;
  private readonly updateCurrentCompanyUseCase: UpdateCurrentCompany;
  private readonly getVerifiedCompaniesUseCase: GetVerifiedCompanies;
  private readonly getUnverifiedCompaniesUseCase: GetUnverifiedCompanies;

  constructor(
    mainTable: string,
    public readonly getCurrentUser: GetCurrentUser,
  ) {
    this.demand = new DynamoDbMaterialDemandRepository(mainTable);
    this.supply = new DynamoDbMaterialSupplyRepository(mainTable);
    this.companies = new DynamoDbCompanyRepository(mainTable);

    this.getActiveDemandUseCase = new GetActiveDemand(
      this.demand,
      this.companies,
    );
    this.getDemandByIdUseCase = new GetDemandById(this.demand, this.companies);
    this.updateDemandUseCase = new UpdateDemand(this.demand);
    this.createDemandUseCase = new CreateDemand(this.demand);
    this.getCompanyDemandUseCase = new GetCompanyDemand(
      this.companies,
      this.demand,
    );
    this.getUnverifiedDemandUseCase = new GetUnverifiedDemand(
      this.demand,
      this.companies,
    );

    this.getActiveSupplyUseCase = new GetActiveSupply(
      this.supply,
      this.companies,
    );
    this.getSupplyByIdUseCase = new GetSupplyById(this.supply, this.companies);
    this.updateSupplyUseCase = new UpdateSupply(this.supply);
    this.createSupplyUseCase = new CreateSupply(this.supply);
    this.getCompanySupplyUseCase = new GetCompanySupply(
      this.companies,
      this.supply,
    );
    this.getUnverifiedSupplyUseCase = new GetUnverifiedSupply(
      this.supply,
      this.companies,
    );

    this.getCompanyByIdUseCase = new GetCompanyById(this.companies);
    this.updateCompanyUseCase = new UpdateCompany(this.companies);
    this.updateCurrentCompanyUseCase = new UpdateCurrentCompany(this.companies);
    this.createCompanyUseCase = new CreateCompany(this.companies);
    this.getVerifiedCompaniesUseCase = new GetVerifiedCompanies(this.companies);
    this.getUnverifiedCompaniesUseCase = new GetUnverifiedCompanies(
      this.companies,
    );
  }

  public async getActiveDemand(): Promise<MaterialDemand[]> {
    const user = await this.getCurrentUser();
    return this.getActiveDemandUseCase.invoke({ user });
  }

  public async getActiveSupply(): Promise<MaterialSupply[]> {
    const user = await this.getCurrentUser();
    return this.getActiveSupplyUseCase.invoke({ user });
  }

  public async getDemandById(
    companyId: string,
    demandId: string,
  ): Promise<DemandViewModel> {
    const user = await this.getCurrentUser();
    return this.getDemandByIdUseCase.invoke({
      user,
      id: { companyId, demandId },
    });
  }

  public async getCompanyById(companyId: string): Promise<Company> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getCompanyByIdUseCase.invoke(user, companyId);
  }

  public async updateDemand(
    demand: MaterialDemandUpdate,
  ): Promise<MaterialDemand> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.updateDemandUseCase.invoke(user, demand);
  }

  public async createDemand(
    demand: NewMaterialDemand,
  ): Promise<MaterialDemand> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.createDemandUseCase.invoke(user, demand);
  }

  public async updateCompany(company: CompanyUpdate): Promise<Company> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.updateCompanyUseCase.invoke(user, company);
  }

  public async createCompany(company: NewCompany): Promise<Company> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.createCompanyUseCase.invoke(user, company);
  }

  public async updateCurrentCompany(
    company: CurrentCompanyUpdate,
  ): Promise<Company> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.updateCurrentCompanyUseCase.invoke(user, company);
  }

  public async getVerifiedCompanies(): Promise<Company[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getVerifiedCompaniesUseCase.invoke(user);
  }

  public async getUnverifiedCompanies(): Promise<Company[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getUnverifiedCompaniesUseCase.invoke(user);
  }

  public async getSupplyById(
    companyId: string,
    supplyId: string,
  ): Promise<SupplyViewModel> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getSupplyByIdUseCase.invoke({
      user,
      id: { companyId, supplyId },
    });
  }

  public async updateSupply(supply: SupplyUpdate): Promise<MaterialSupply> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.updateSupplyUseCase.invoke(user, supply);
  }

  public async createSupply(
    supply: NewMaterialSupply,
  ): Promise<MaterialSupply> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.createSupplyUseCase.invoke(user, supply);
  }

  public async getCurrentCompany(): Promise<Company | undefined> {
    const user = await this.getCurrentUser();
    const companyId = user?.companyId;
    if (!companyId) return undefined;
    return this.getCompanyByIdUseCase.invoke(user, companyId);
  }

  public async getCompanyDemand(companyId: string): Promise<DemandViewModel[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getCompanyDemandUseCase.invoke(user, companyId);
  }

  public async getCompanySupply(companyId: string): Promise<SupplyViewModel[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getCompanySupplyUseCase.invoke(user, companyId);
  }

  public async getAllCompanies(): Promise<Company[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    const [verified, unverified] = await Promise.all([
      this.getVerifiedCompaniesUseCase.invoke(user),
      this.getUnverifiedCompaniesUseCase.invoke(user),
    ]);
    return [...verified, ...unverified];
  }

  public async getUnverifiedDemand(): Promise<MaterialDemand[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getUnverifiedDemandUseCase.invoke(user);
  }

  public async getUnverifiedSupply(): Promise<MaterialSupply[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getUnverifiedSupplyUseCase.invoke(user);
  }
}

export * from './domain/material/Material';
export * from './domain/company/Company';
export * from './domain/demand/Demand';
export * from './domain/supply/Supply';
export * from './domain/common/common';
export * from './application/view-models';
export * from './domain/user/User';

export type {
  SignedInUser,
  SupplyViewModel,
  MaterialSupply,
  MaterialDemand,
  DemandViewModel,
};
export {
  SignedInUserSchema,
  NewCompanySchema,
  CompanyUpdateSchema,
  CurrentCompanyUpdateSchema,
  NewMaterialSupplySchema,
  SupplyUpdateSchema,
};
