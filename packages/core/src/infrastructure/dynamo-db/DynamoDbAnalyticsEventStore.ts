import { PutCommand } from '@aws-sdk/lib-dynamodb';
import {
  AnalyticsEvent,
  ItemViewedEvent,
} from '../../domain/analytics/ViewAnalytics';
import { DynamoDbRepository } from './DynamoDbRepository';
import { addHours } from 'date-fns';
import { AnalyticsEventStore } from '../../domain/analytics/AnalyticsStore';

export class DynamoDbAnalyticsEventStore
  extends DynamoDbRepository
  implements AnalyticsEventStore
{
  constructor(private readonly analyticsTable: string) {
    super();
  }

  public async getItemViewedEvents(
    startDate: Date,
  ): Promise<ItemViewedEvent[]> {
    const events = await this.getEvents<ItemViewedEvent>(startDate);
    return events.filter((event) => event.type === 'ItemViewed');
  }

  public async getEvents<T>(startDate: Date, endDate?: Date): Promise<T[]> {
    const startDateString = startDate.toISOString();
    const endDateString = (endDate || addHours(new Date(), 1)).toISOString();

    const records = await this.queryAll({
      TableName: this.analyticsTable,
      KeyConditionExpression: 'PK = :PK AND SK BETWEEN :SK1 AND :SK2',
      ExpressionAttributeValues: {
        ':PK': `ANALYTICS_EVENT`,
        ':SK1': `ANALYTICS_EVENT#${startDateString}`,
        ':SK2': `ANALYTICS_EVENT#${endDateString}`,
      },
    });

    return records.map((record) => record.payload);
  }

  public async saveEvent(event: AnalyticsEvent): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.analyticsTable,
        Item: {
          PK: `ANALYTICS_EVENT`,
          SK: `ANALYTICS_EVENT#${event.eventDate}#${event.id}`,
          payload: event,
        },
      }),
    );
  }
}
