import { DynamoDbRepository } from './DynamoDbRepository';
import { CompanyRepository } from '../../domain/company/CompanyRepository';
import {
  Company,
  CompanyDetails,
  CompanyDetailsSchema,
} from '../../domain/company/Company';
import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export class DynamoDbCompanyRepository
  extends DynamoDbRepository
  implements CompanyRepository
{
  constructor(private readonly mainTable: string) {
    super();
  }

  public async getVerifiedCompanies(): Promise<Company[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression:
        'GSI1_PK = :GSI1_PK AND begins_with(GSI1_SK, :GSI1_SK)',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':GSI1_PK': `COMPANY`,
        ':GSI1_SK': `COMPANY#VERIFIED#`,
        ':deleted': true,
      },
      ScanIndexForward: false,
    });
    return records.map((record) => record.payload);
  }

  public async getUnverifiedCompanies(): Promise<Company[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression:
        'GSI1_PK = :GSI1_PK AND begins_with(GSI1_SK, :GSI1_SK)',
      ExpressionAttributeValues: {
        ':GSI1_PK': `COMPANY`,
        ':GSI1_SK': `COMPANY#UNVERIFIED#`,
      },
    });
    return records.map((record) => record.payload);
  }

  public async update(company: Company): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.mainTable,
        Item: {
          PK: `COMPANY#${company.id}`,
          SK: `COMPANY#${company.id}`,
          GSI1_PK: `COMPANY`,
          GSI1_SK: `COMPANY#${company.verified ? 'VERIFIED' : 'UNVERIFIED'}#${company.createdDate}`,
          payload: company,
        },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      }),
    );
  }

  public async getDetailsById(id: string): Promise<CompanyDetails> {
    const companyRecords = await this.queryAll({
      TableName: this.mainTable,
      KeyConditionExpression: 'PK = :PK',
      ExpressionAttributeValues: {
        ':PK': `COMPANY#${id}`,
      },
    });

    const primaryRecord = companyRecords.find(
      (record) => record.PK === `COMPANY#${id}`,
    );
    if (!primaryRecord) throw new Error(`Company record not found: ${id}`);

    const company = primaryRecord.payload;
    if (!company || company.deleted)
      throw new Error(`Company not found: ${id}`);

    let demand = 0;
    let supply = 0;

    companyRecords.forEach((r) => {
      if (r.deleted) return;
      if (r.SK.startsWith('MATERIAL_DEMAND#')) demand++;
      if (r.SK.startsWith('MATERIAL_SUPPLY#')) supply++;
    });

    return CompanyDetailsSchema.parse({
      ...company,
      demand,
      supply,
    });
  }

  public async getById(id: string): Promise<Company> {
    const PK = `COMPANY#${id}`;
    const SK = `COMPANY#${id}`;

    const response = await this.dynamo.send(
      new GetCommand({
        TableName: this.mainTable,
        Key: { PK, SK },
      }),
    );

    const record = response.Item;

    if (!record) throw new Error(`Company not found: PK: ${PK}, SK: ${SK}`);
    if (record.deleted)
      throw new Error(`Company deleted: PK: ${PK}, SK: ${SK}`);

    return record.payload;
  }

  public async getByIds(ids: string[]): Promise<Map<string, Company>> {
    const uniqueIds = [...new Set(ids)];
    const records = await this.getAllByIds(
      this.mainTable,
      uniqueIds.map((id) => ({ PK: `COMPANY#${id}`, SK: `COMPANY#${id}` })),
    );
    return new Map<string, Company>(
      records.map((record) => [record.payload.id, record.payload]),
    );
  }

  public async getAll(): Promise<Company[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression:
        'GSI1_PK = :GSI1_PK AND begins_with(GSI1_SK, :GSI1_SK)',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':GSI1_PK': `COMPANY`,
        ':GSI1_SK': `COMPANY#`,
        ':deleted': true,
      },
    });

    return records.map((record) => record.payload);
  }

  public async create(company: Company): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.mainTable,
        Item: {
          PK: `COMPANY#${company.id}`,
          SK: `COMPANY#${company.id}`,
          GSI1_PK: `COMPANY`,
          GSI1_SK: `COMPANY#${company.verified ? 'VERIFIED' : 'UNVERIFIED'}#${company.createdDate}`,
          payload: company,
        },
        ConditionExpression:
          'attribute_not_exists(PK) AND attribute_not_exists(SK)',
      }),
    );
  }

  public async delete(companyId: string): Promise<void> {
    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.mainTable,
        Key: { PK: `COMPANY#${companyId}`, SK: `COMPANY#${companyId}` },
        UpdateExpression: 'SET deleted = :deleted REMOVE GSI1_PK, GSI1_SK',
        ExpressionAttributeValues: { ':deleted': true },
      }),
    );
  }
}
