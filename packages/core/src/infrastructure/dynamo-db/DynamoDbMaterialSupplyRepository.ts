import { DynamoDbRepository } from './DynamoDbRepository';
import { MaterialSupplyRepository } from '../../domain/material/supply/MaterialSupplyRepository';
import { MaterialSupply } from '../../domain/material/supply/Supply';
import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { subMonths } from 'date-fns';
import { getEarliestDate } from '../../lib/dates';

export class DynamoDbMaterialSupplyRepository
  extends DynamoDbRepository
  implements MaterialSupplyRepository
{
  constructor(private readonly mainTable: string) {
    super();
  }

  public async getUnverifiedSupply(): Promise<MaterialSupply[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression:
        'GSI1_PK = :GSI1_PK AND begins_with(GSI1_SK, :GSI1_SK)',
      ExpressionAttributeValues: {
        ':GSI1_PK': `MATERIAL_SUPPLY`,
        ':GSI1_SK': `MATERIAL_SUPPLY#UNVERIFIED#`,
      },
    });
    return records.map((record) => record.payload);
  }

  public async create(materialSupply: MaterialSupply): Promise<void> {
    const { id, companyId, updatedDate, verified } = materialSupply;

    await this.dynamo.send(
      new PutCommand({
        TableName: this.mainTable,
        Item: {
          PK: `COMPANY#${companyId}`,
          SK: `MATERIAL_SUPPLY#${id}`,
          GSI1_PK: `MATERIAL_SUPPLY`,
          GSI1_SK: `MATERIAL_SUPPLY#${verified ? 'VERIFIED' : 'UNVERIFIED'}#${updatedDate}`,
          payload: materialSupply,
        },
        ConditionExpression:
          'attribute_not_exists(PK) AND attribute_not_exists(SK)',
      }),
    );
  }

  public async getById(companyId: string, id: string): Promise<MaterialSupply> {
    const PK = `COMPANY#${companyId}`;
    const SK = `MATERIAL_SUPPLY#${id}`;

    const response = await this.dynamo.send(
      new GetCommand({
        TableName: this.mainTable,
        Key: { PK, SK },
      }),
    );

    const record = response.Item;

    if (!record) throw new Error(`Supply not found: PK: ${PK}, SK: ${SK}`);
    if (record.deleted) throw new Error(`Supply deleted: PK: ${PK}, SK: ${SK}`);

    return record.payload;
  }

  public async getByCompanyId(companyId: string): Promise<MaterialSupply[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':PK': `COMPANY#${companyId}`,
        ':SK': `MATERIAL_SUPPLY#`,
        ':deleted': true,
      },
    });
    return records.map((r) => r.payload);
  }

  public async update(materialSupply: MaterialSupply): Promise<void> {
    const { id, companyId, updatedDate, verified } = materialSupply;
    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.mainTable,
        Key: {
          PK: `COMPANY#${companyId}`,
          SK: `MATERIAL_SUPPLY#${id}`,
        },
        UpdateExpression:
          'SET payload = :payload, GSI1_PK = :GSI1_PK, GSI1_SK = :GSI1_SK',
        ExpressionAttributeValues: {
          ':payload': materialSupply,
          ':GSI1_PK': `MATERIAL_SUPPLY`,
          ':GSI1_SK': `MATERIAL_SUPPLY#${verified ? 'VERIFIED' : 'UNVERIFIED'}#${updatedDate}`,
        },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      }),
    );
  }

  public async delete(companyId: string, id: string): Promise<void> {
    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.mainTable,
        Key: { PK: `COMPANY#${companyId}`, SK: `MATERIAL_SUPPLY#${id}` },
        UpdateExpression: 'SET deleted = :deleted REMOVE GSI1_PK, GSI1_SK',
        ExpressionAttributeValues: { ':deleted': true },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      }),
    );
  }

  public async getActiveSupply(startDate?: Date): Promise<MaterialSupply[]> {
    const earliestDate = subMonths(new Date(), 3);
    const dateFrom = getEarliestDate([startDate, earliestDate]) || earliestDate;

    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1_PK = :GSI1_PK AND GSI1_SK >= :GSI1_SK',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':GSI1_PK': `MATERIAL_SUPPLY`,
        ':GSI1_SK': `MATERIAL_SUPPLY#VERIFIED#${dateFrom.toISOString()}`,
        ':deleted': true,
      },
      ScanIndexForward: false,
    });
    return records.map((r) => r.payload);
  }
}
