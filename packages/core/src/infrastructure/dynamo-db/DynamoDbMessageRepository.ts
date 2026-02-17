import { DynamoDbRepository } from './DynamoDbRepository';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { MessageRepository } from '../../domain/communication/MessageRepository';
import { MessageThread, Message } from '../../domain/communication/Message';

export class DynamoDbMessageRepository
  extends DynamoDbRepository
  implements MessageRepository {
  constructor(
    private readonly communicationTable: string,
    config: DynamoDBClientConfig,
  ) {
    super(config);
  }

  public async saveThread(thread: MessageThread): Promise<void> {
    const { id, from, to } = thread;

    await Promise.all([
      this.dynamo.send(
        new PutCommand({
          TableName: this.communicationTable,
          Item: {
            PK: `COMPANY#${from.companyId}`,
            SK: `MESSAGE_THREAD#${id}`,
            payload: thread,
          },
        }),
      ),
      this.dynamo.send(
        new PutCommand({
          TableName: this.communicationTable,
          Item: {
            PK: `COMPANY#${to.companyId}`,
            SK: `MESSAGE_THREAD#${id}`,
            payload: thread,
          },
        }),
      ),
    ]);
  }

  public async saveMessage(message: Message): Promise<void> {
    await this.dynamo.send(
      new PutCommand({
        TableName: this.communicationTable,
        Item: {
          PK: `MESSAGE_THREAD#${message.threadId}`,
          SK: `MESSAGE#${message.id}`,
          payload: message,
        },
      }),
    );
  }

  public async getMessagesByThreadId(threadId: string): Promise<Message[]> {
    const response = await this.queryAll({
      TableName: this.communicationTable,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `MESSAGE_THREAD#${threadId}`,
        ':sk': 'MESSAGE#',
      },
    });

    return response
      .map((item) => item.payload)
      .sort((a, b) => a.createdDate.localeCompare(b.createdDate));
  }

  public async getThreadById(
    companyId: string,
    threadId: string,
  ): Promise<MessageThread> {
    const PK = `COMPANY#${companyId}`;
    const SK = `MESSAGE_THREAD#${threadId}`;

    const record = await this.dynamo.send(
      new GetCommand({
        TableName: this.communicationTable,
        Key: { PK, SK },
      }),
    );

    if (!record.Item)
      throw new Error(`Message thread not found: PK: ${PK}, SK: ${SK}`);
    return record.Item.payload;
  }

  public async getThreadsByCompanyId(
    companyId: string,
  ): Promise<MessageThread[]> {
    const PK = `COMPANY#${companyId}`;

    const records = await this.queryAll({
      TableName: this.communicationTable,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: { ':pk': PK, ':sk': 'MESSAGE_THREAD#' },
    });

    return records.map((record) => record.payload).sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));
  }
}
