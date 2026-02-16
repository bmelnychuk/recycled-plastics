import { DynamoDbCompanyRepository } from './infrastructure/dynamo-db/DynamoDbCompanyRepository';
import { DynamoDbMaterialDemandRepository } from './infrastructure/dynamo-db/DynamoDbMaterialDemandRepository';
import { DynamoDbMaterialSupplyRepository } from './infrastructure/dynamo-db/DynamoDbMaterialSupplyRepository';
import { MaterialDemand } from './domain/demand/Demand';
import {
  assertCanAccessCompany,
  AuthService,
  SignedInUser,
  SignedInUserSchema,
} from './application/auth/AuthService';
import { GetActiveDemand } from './application/use-case/demand/GetActiveDemand';
import { GetActiveSupply } from './application/use-case/supply/GetActiveSupply';
import { MaterialSupply } from './domain/supply/Supply';
import { MaterialSupplyRepository } from './domain/supply/MaterialSupplyRepository';
import { CompanyRepository } from './domain/company/CompanyRepository';
import { MaterialDemandRepository } from './domain/demand/MaterialDemandRepository';
import {
  DemandViewModel,
  MessageThreadViewModel,
  MessageViewModel,
  SupplyViewModel,
} from './application/view-models';
import { GetDemandById } from './application/use-case/demand/GetDemandById';
import { GetCompanyById } from './application/use-case/company/GetCompanyDetails';
import { Company } from './domain/company/Company';
import {
  MaterialDemandUpdate,
  MaterialDemandUpdateSchema,
  UpdateDemand,
} from './application/use-case/demand/UpdateDemand';
import {
  CreateDemand,
  NewMaterialDemand,
  NewMaterialDemandSchema,
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
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import {
  FileUploadRequest,
  FileUploadRequestSchema,
  FileUploadResponse,
} from './application/service/FileUploadService';
import { S3Storage } from './infrastructure/s3/S3Storage';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { newUuid } from './lib/identity';
import { ClerkAuthService } from './infrastructure/clerk/ClerkAuthService';
import { GetCompanyUsers } from './application/use-case/user/GetCompanyUsers';
import { User } from './domain/user/User';
import { MessageRepository } from './domain/communication/MessageRepository';
import { DynamoDbMessageRepository } from './infrastructure/dynamo-db/DynamoDbMessageRepository';
import { GetMessages } from './application/use-case/communication/GetMessages';
import { GetCompanyMessageThreads } from './application/use-case/communication/GetCompanyMessageThreads';
import { GetMessageThread } from './application/use-case/communication/GetMessageThread';
import {
  NewMessage,
  WriteMessage,
} from './application/use-case/communication/WriteMessage';

export type GetCurrentUser = () => Promise<SignedInUser | undefined>;

export class Application {
  private readonly demand: MaterialDemandRepository;
  private readonly supply: MaterialSupplyRepository;
  private readonly companies: CompanyRepository;
  private readonly messages: MessageRepository;
  private readonly authService: ClerkAuthService;
  private readonly s3Storage: S3Storage;

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

  private readonly getCompanyUsersUseCase: GetCompanyUsers;

  private readonly getMessagesUseCase: GetMessages;
  private readonly getCompanyMessageThreadsUseCase: GetCompanyMessageThreads;
  private readonly getMessageThreadUseCase: GetMessageThread;
  private readonly createMessageThreadUseCase: WriteMessage;

  constructor(
    mainTable: string,
    communicationTable: string,
    private readonly bucket: string,
    clerkSecretKey: string,
    dynamoDbConfig: DynamoDBClientConfig,
    s3Config: S3ClientConfig,
    public readonly getCurrentUser: GetCurrentUser,
  ) {
    this.authService = new ClerkAuthService(clerkSecretKey);

    this.demand = new DynamoDbMaterialDemandRepository(
      mainTable,
      dynamoDbConfig,
    );
    this.supply = new DynamoDbMaterialSupplyRepository(
      mainTable,
      dynamoDbConfig,
    );
    this.companies = new DynamoDbCompanyRepository(mainTable, dynamoDbConfig);
    this.s3Storage = new S3Storage(s3Config);
    this.messages = new DynamoDbMessageRepository(
      communicationTable,
      dynamoDbConfig,
    );

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
    this.updateCompanyUseCase = new UpdateCompany(
      this.companies,
      this.authService,
    );
    this.updateCurrentCompanyUseCase = new UpdateCurrentCompany(this.companies);
    this.createCompanyUseCase = new CreateCompany(
      this.companies,
      this.authService,
    );
    this.getVerifiedCompaniesUseCase = new GetVerifiedCompanies(this.companies);
    this.getUnverifiedCompaniesUseCase = new GetUnverifiedCompanies(
      this.companies,
    );

    this.getCompanyUsersUseCase = new GetCompanyUsers(
      this.authService,
      this.companies,
    );

    this.getMessagesUseCase = new GetMessages(this.messages, this.authService);
    this.getCompanyMessageThreadsUseCase = new GetCompanyMessageThreads(
      this.messages,
      this.companies,
    );
    this.getMessageThreadUseCase = new GetMessageThread(
      this.messages,
      this.companies,
    );
    this.createMessageThreadUseCase = new WriteMessage(this.messages);
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

  public async getCompanyById(companyId: string): Promise<Company | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;
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

  public async getCompanyUsers(companyId: string): Promise<User[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getCompanyUsersUseCase.invoke(user, companyId);
  }

  public async getMessages(input: {
    companyId?: string;
    threadId: string;
  }): Promise<MessageViewModel[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getMessagesUseCase.invoke(user, input);
  }

  public async getCompanyMessageThreads(
    companyId?: string,
  ): Promise<MessageThreadViewModel[]> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getCompanyMessageThreadsUseCase.invoke(user, companyId);
  }

  public async getMessageThread(
    companyId: string,
    threadId: string,
  ): Promise<MessageThreadViewModel> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.getMessageThreadUseCase.invoke(user, { companyId, threadId });
  }

  public async createMessageThread(message: NewMessage): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return this.createMessageThreadUseCase.invoke(user, message);
  }

  public async getFileUploadUrl(
    request: FileUploadRequest,
  ): Promise<FileUploadResponse> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    assertCanAccessCompany(user, request.companyId);

    const { uploadType, contentType, companyId } = request;
    const fileId = newUuid();

    let s3Key = '';
    switch (uploadType) {
      case 'demand-document':
        s3Key = `companies/${companyId}/demand/${request.materialId}/documents/${fileId}`;
        break;
      case 'supply-document':
        s3Key = `companies/${companyId}/supply/${request.materialId}/documents/${fileId}`;
        break;
      case 'supply-picture':
        s3Key = `companies/${companyId}/supply/${request.materialId}/pictures/${fileId}`;
        break;
      case 'company-logo':
        s3Key = `companies/${companyId}/logo/${fileId}`;
        break;
      case 'company-private-document':
        s3Key = `companies/${companyId}/private-documents/${fileId}`;
        break;
      default:
        throw new Error('Invalid upload type');
    }

    const s3Upload = await this.s3Storage.getFileUploadUrl(this.bucket, {
      s3Key,
      contentType,
    });

    return {
      fileId,
      downloadUrl: s3Upload.downloadUrl,
      uploadUrl: s3Upload.uploadUrl,
    };
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
  NewMaterialSupply,
  MaterialDemand,
  NewMaterialDemand,
  MaterialDemandUpdate,
  DemandViewModel,
  FileUploadRequest,
  SupplyUpdate,
  FileUploadResponse,
  NewCompany,
  CompanyUpdate,
  CurrentCompanyUpdate,
};

export {
  SignedInUserSchema,
  NewCompanySchema,
  CompanyUpdateSchema,
  CurrentCompanyUpdateSchema,
  NewMaterialSupplySchema,
  NewMaterialDemandSchema,
  MaterialDemandUpdateSchema,
  SupplyUpdateSchema,
  FileUploadRequestSchema,
  newUuid,
};
