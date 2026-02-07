import { DynamoDbRepository } from './DynamoDbRepository';

import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { subMonths } from 'date-fns';
import { MaterialDemandRepository } from '../../domain/material/demand/MaterialDemandRepository';
import { MaterialDemand } from '../../domain/material/demand/Demand';
import { getEarliestDate } from '../../lib/dates';

export class DynamoDbMaterialDemandRepository
  extends DynamoDbRepository
  implements MaterialDemandRepository
{
  constructor(private readonly mainTable: string) {
    super();
  }

  public async getUnverifiedDemand(): Promise<MaterialDemand[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression:
        'GSI1_PK = :GSI1_PK AND begins_with(GSI1_SK, :GSI1_SK)',
      ExpressionAttributeValues: {
        ':GSI1_PK': `MATERIAL_DEMAND`,
        ':GSI1_SK': `MATERIAL_DEMAND#UNVERIFIED#`,
      },
    });

    return records.map((record) => record.payload);
  }

  public async create(materialDemand: MaterialDemand): Promise<void> {
    const { id, companyId, verified, updatedDate } = materialDemand;
    await this.dynamo.send(
      new PutCommand({
        TableName: this.mainTable,
        Item: {
          PK: `COMPANY#${companyId}`,
          SK: `MATERIAL_DEMAND#${id}`,
          GSI1_PK: `MATERIAL_DEMAND`,
          GSI1_SK: `MATERIAL_DEMAND#${verified ? 'VERIFIED' : 'UNVERIFIED'}#${updatedDate}`,
          payload: materialDemand,
        },
        ConditionExpression:
          'attribute_not_exists(PK) AND attribute_not_exists(SK)',
      }),
    );
  }

  public async getById(companyId: string, id: string): Promise<MaterialDemand> {
    const PK = `COMPANY#${companyId}`;
    const SK = `MATERIAL_DEMAND#${id}`;

    const response = await this.dynamo.send(
      new GetCommand({
        TableName: this.mainTable,
        Key: { PK, SK },
      }),
    );

    const record = response.Item;

    if (!record) throw new Error(`Demand not found: PK: ${PK}, SK: ${SK}`);
    if (record.deleted) throw new Error(`Demand deleted: PK: ${PK}, SK: ${SK}`);

    return record.payload;
  }

  public async getByCompanyId(companyId: string): Promise<MaterialDemand[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':PK': `COMPANY#${companyId}`,
        ':SK': `MATERIAL_DEMAND#`,
        ':deleted': true,
      },
    });
    return records.map((record) => record.payload);
  }

  public async update(materialDemand: MaterialDemand): Promise<void> {
    const { id, companyId, verified, updatedDate } = materialDemand;

    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.mainTable,
        Key: {
          PK: `COMPANY#${companyId}`,
          SK: `MATERIAL_DEMAND#${id}`,
        },
        UpdateExpression:
          'SET payload = :payload, GSI1_PK = :GSI1_PK, GSI1_SK = :GSI1_SK',
        ExpressionAttributeValues: {
          ':payload': materialDemand,
          ':GSI1_PK': `MATERIAL_DEMAND`,
          ':GSI1_SK': `MATERIAL_DEMAND#${verified ? 'VERIFIED' : 'UNVERIFIED'}#${updatedDate}`,
        },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      }),
    );
  }

  public async delete(companyId: string, id: string): Promise<void> {
    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.mainTable,
        Key: { PK: `COMPANY#${companyId}`, SK: `MATERIAL_DEMAND#${id}` },
        UpdateExpression: 'SET deleted = :deleted REMOVE GSI1_PK, GSI1_SK',
        ExpressionAttributeValues: { ':deleted': true },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      }),
    );
  }

  public async getActiveDemand(startDate?: Date): Promise<MaterialDemand[]> {
    const earliestDate = subMonths(new Date(), 3);
    const dateFrom = getEarliestDate([startDate, earliestDate]) || earliestDate;

    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1_PK = :GSI1_PK AND GSI1_SK >= :GSI1_SK',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':GSI1_PK': `MATERIAL_DEMAND`,
        ':GSI1_SK': `MATERIAL_DEMAND#VERIFIED#${dateFrom.toISOString()}`,
        ':deleted': true,
      },
    });
    return records.map((record) => record.payload);
  }
}
