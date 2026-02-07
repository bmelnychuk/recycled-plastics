import { DynamoDbRepository } from './DynamoDbRepository';
import {
  GetCommand,
  PutCommand,
  TransactWriteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { UserRepository } from '../../domain/user/UserRepository';
import { User, UserSchema } from '../../domain/user/User';

export class DynamoDbUserRepository
  extends DynamoDbRepository
  implements UserRepository {
  constructor(private readonly mainTable: string) {
    super();
  }

  public async getByCompanyId(companyId: string): Promise<User[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':PK': `COMPANY#${companyId}`,
        ':SK': `USER#`,
        ':deleted': true,
      },
    });

    return records.map((r) => r.payload);
  }

  public async update(user: User): Promise<void> {
    if (user.companyId) {
      await this.dynamo.send(
        new TransactWriteCommand({
          TransactItems: [
            {
              Update: {
                TableName: this.mainTable,
                Key: { PK: `USER#${user.id}`, SK: `USER#${user.id}` },
                UpdateExpression: 'SET payload = :payload, GSI1_SK = :GSI1_SK',
                ExpressionAttributeValues: {
                  ':payload': user,
                  ':GSI1_SK': `USER#${user.updatedDate}`,
                },
                ConditionExpression:
                  'attribute_exists(PK) AND attribute_exists(SK)',
              },
            },
            {
              Update: {
                TableName: this.mainTable,
                Key: { PK: `COMPANY#${user.companyId}`, SK: `USER#${user.id}` },
                UpdateExpression: 'SET payload = :payload',
                ExpressionAttributeValues: { ':payload': user },
              },
            },
          ],
        }),
      );
    } else {
      await this.dynamo.send(
        new UpdateCommand({
          TableName: this.mainTable,
          Key: { PK: `USER#${user.id}`, SK: `USER#${user.id}` },
          UpdateExpression: 'SET payload = :payload, GSI1_SK = :GSI1_SK',
          ExpressionAttributeValues: {
            ':payload': user,
            ':GSI1_SK': `USER#${user.updatedDate}`,
          },
          ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
        }),
      );
    }
  }

  public async getById(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new Error(`User not found: ${id}`);
    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const response = await this.dynamo.send(
      new GetCommand({
        TableName: this.mainTable,
        Key: { PK: `USER#${id}`, SK: `USER#${id}` },
      }),
    );
    if (!response.Item) return null;

    return UserSchema.parse(response.Item.payload);
  }

  public async getAll(): Promise<User[]> {
    const records = await this.queryAll({
      TableName: this.mainTable,
      IndexName: 'GSI1',
      KeyConditionExpression:
        'GSI1_PK = :GSI1_PK AND begins_with(GSI1_SK, :GSI1_SK)',
      FilterExpression: 'deleted <> :deleted',
      ExpressionAttributeValues: {
        ':GSI1_PK': `USER`,
        ':GSI1_SK': `USER#`,
        ':deleted': true,
      },
      ScanIndexForward: false,
    });
    return records.map((r) => r.payload);
  }

  public async create(user: User): Promise<void> {
    if (user.companyId) {
      await this.dynamo.send(
        new TransactWriteCommand({
          TransactItems: [
            {
              Put: {
                TableName: this.mainTable,
                Item: {
                  PK: `USER#${user.id}`,
                  SK: `USER#${user.id}`,
                  GSI1_PK: `USER`,
                  GSI1_SK: `USER#${user.createdDate}`,
                  payload: user,
                  integrations: {},
                },
                ConditionExpression:
                  'attribute_not_exists(PK) AND attribute_not_exists(SK)',
              },
            },
            {
              Put: {
                TableName: this.mainTable,
                Item: {
                  PK: `COMPANY#${user.companyId}`,
                  SK: `USER#${user.id}`,
                  payload: user,
                },
                ConditionExpression:
                  'attribute_not_exists(PK) AND attribute_not_exists(SK)',
              },
            },
          ],
        }),
      );
    } else {
      await this.dynamo.send(
        new PutCommand({
          TableName: this.mainTable,
          Item: {
            PK: `USER#${user.id}`,
            SK: `USER#${user.id}`,
            GSI1_PK: `USER`,
            GSI1_SK: `USER#${user.createdDate}`,
            payload: user,
            integrations: {},
          },
          ConditionExpression:
            'attribute_not_exists(PK) AND attribute_not_exists(SK)',
        }),
      );
    }
  }

  public async addIntegration(
    userId: string,
    integration: { provider: string; externalId: string },
  ): Promise<void> {
    const { provider, externalId } = integration;
    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.mainTable,
        Key: { PK: `USER#${userId}`, SK: `USER#${userId}` },
        UpdateExpression: `SET integrations.${provider} = :integration`,
        ExpressionAttributeValues: { ':integration': externalId },
        ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      }),
    );
  }

  public async initUser(user: User): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.mainTable,
        Item: {
          PK: `USER#${user.id}`,
          SK: `USER#${user.id}`,
          GSI1_PK: `USER`,
          GSI1_SK: `USER#${user.createdDate}`,
          payload: user,
        },
      }),
    );
  }
}
