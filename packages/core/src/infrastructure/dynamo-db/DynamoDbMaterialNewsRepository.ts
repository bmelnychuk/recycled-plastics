import { DynamoDbRepository } from './DynamoDbRepository';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { NewsRepository } from '../../domain/news/NewsRepository';
import { News } from '../../domain/news/News';

export class DynamoDbMaterialNewsRepository
  extends DynamoDbRepository
  implements NewsRepository
{
  constructor(private readonly cacheTable: string) {
    super();
  }

  public async save(news: News): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.cacheTable,
        Item: {
          PK: `NEWS`,
          SK: `NEWS#${news.date}#${news.id}`,
          payload: news,
        },
      }),
    );
  }

  public async getLatest(): Promise<News[]> {
    const records = await this.queryAll({
      TableName: this.cacheTable,
      KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
      ExpressionAttributeValues: {
        ':PK': `NEWS`,
        ':SK': `NEWS#`,
      },
    });
    return records.map((record) => record.payload);
  }
}
