import { DynamoDbRepository } from './DynamoDbRepository';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { AnalyticsStore } from '../../domain/analytics/AnalyticsStore';
import {
  ViewedTarget,
  ViewsAnalyticsData,
} from '../../domain/analytics/ViewAnalytics';
import {
  MaterialAnalyticsByDate,
  MaterialAnalyticsByCountry,
} from '../../domain/analytics/MaterialAnalytics';
import { PlatformAnalytics } from '../../domain/analytics/PlatformAnalytics';

export class DynamoDbAnalyticsStore
  extends DynamoDbRepository
  implements AnalyticsStore
{
  constructor(private readonly analyticsTable: string) {
    super();
  }

  public async getViewsAnalytics(
    target: ViewedTarget,
  ): Promise<ViewsAnalyticsData> {
    const PK = `COMPANY#${target.companyId}`;
    const SK = `ANALYTICS#${target.type}#${target.targetId}`;

    const response = await this.dynamo.send(
      new GetCommand({
        TableName: this.analyticsTable,
        Key: { PK, SK },
      }),
    );

    if (!response.Item) throw new Error('Views analytics not found');
    return response.Item.payload;
  }

  public async saveViewsAnalytics(data: ViewsAnalyticsData): Promise<void> {
    const PK = `COMPANY#${data.target.companyId}`;
    const SK = `ANALYTICS#${data.target.type}#${data.target.targetId}`;

    await this.dynamo.send(
      new PutCommand({
        TableName: this.analyticsTable,
        Item: { PK, SK, payload: data },
      }),
    );
  }

  public async savePlatformAnalytics(data: PlatformAnalytics): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.analyticsTable,
        Item: {
          PK: `ANALYTICS#PLATFORM`,
          SK: `ANALYTICS#PLATFORM`,
          payload: data,
        },
      }),
    );
  }

  public async getPlatformAnalytics(): Promise<PlatformAnalytics> {
    return this.dynamo
      .send(
        new GetCommand({
          TableName: this.analyticsTable,
          Key: { PK: `ANALYTICS#PLATFORM`, SK: `ANALYTICS#PLATFORM` },
        }),
      )
      .then((response) => response.Item?.payload);
  }

  public async getAnalyticsByDate(): Promise<MaterialAnalyticsByDate[]> {
    return this.queryAll({
      TableName: this.analyticsTable,
      KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
      ExpressionAttributeValues: {
        ':PK': `ANALYTICS#BY_DATE`,
        ':SK': `ANALYTICS#MATERIAL_TYPE#`,
      },
    }).then((records) => records.map((record) => record.payload));
  }

  public async getAnalyticsByCountry(): Promise<MaterialAnalyticsByCountry[]> {
    return this.queryAll({
      TableName: this.analyticsTable,
      KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
      ExpressionAttributeValues: {
        ':PK': `ANALYTICS#BY_COUNTRY`,
        ':SK': `ANALYTICS#MATERIAL_TYPE#`,
      },
    }).then((records) => records.map((record) => record.payload));
  }

  public async saveAnalyticsByDate(
    data: MaterialAnalyticsByDate[],
  ): Promise<void> {
    await Promise.all(
      data.map((a) => {
        return this.dynamo.send(
          new PutCommand({
            TableName: this.analyticsTable,
            Item: {
              PK: `ANALYTICS#BY_DATE`,
              SK: `ANALYTICS#MATERIAL_TYPE#${a.materialType}`,
              payload: a,
            },
          }),
        );
      }),
    );
  }

  public async saveAnalyticsByCountry(
    data: MaterialAnalyticsByCountry[],
  ): Promise<void> {
    await Promise.all(
      data.map((a) => {
        return this.dynamo.send(
          new PutCommand({
            TableName: this.analyticsTable,
            Item: {
              PK: `ANALYTICS#BY_COUNTRY`,
              SK: `ANALYTICS#MATERIAL_TYPE#${a.materialType}`,
              payload: a,
            },
          }),
        );
      }),
    );
  }
}
