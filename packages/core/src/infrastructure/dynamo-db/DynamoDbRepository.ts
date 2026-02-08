import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  BatchGetCommand,
  BatchWriteCommand,
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';

// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import { auth } from "@clerk/nextjs/server";

// const client = new DynamoDBClient({
//   region: process.env.AWS_REGION!,
//   credentials: awsCredentialsProvider({
//     roleArn: process.env.AWS_ROLE_ARN!,
//   }),
// });

// const client = new DynamoDBClient({

// });

const client = new DynamoDBClient({});
const dynamoDbClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: true,
  },
});

export class DynamoDbRepository {
  protected dynamo: DynamoDBDocumentClient = dynamoDbClient;

  public async scanAll<T extends Record<string, any>>(
    table: string,
  ): Promise<T[]> {
    let lastEvaluatedKey = undefined;
    const allItems: T[] = [];

    do {
      const data: ScanCommandOutput = await this.dynamo.send(
        new ScanCommand({
          TableName: table,
          ExclusiveStartKey: lastEvaluatedKey,
        }),
      );
      if (data.Items) allItems.push(...(data.Items as T[]));
      lastEvaluatedKey = data.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return allItems;
  }

  public async deleteAll(
    table: string,
    keys: Record<string, unknown>[],
  ): Promise<void> {
    const chunks = chunk(keys, 10);
    for (const chunk of chunks) {
      const deleteRequests = chunk.map((key) => ({
        DeleteRequest: { Key: key as Record<string, any> },
      }));
      const command = new BatchWriteCommand({
        RequestItems: {
          [table]: deleteRequests,
        },
      });

      await this.dynamo.send(command);
    }
  }

  public async purgeTable(
    table: string,
    pkColumn: string,
    skColumn: string,
  ): Promise<void> {
    let lastEvaluatedKey = undefined;

    do {
      const data: ScanCommandOutput = await this.dynamo.send(
        new ScanCommand({
          TableName: table,
          ExclusiveStartKey: lastEvaluatedKey,
        }),
      );
      const items = data.Items || [];

      await Promise.all(
        chunk(items, 25).map((chunkedItem) => {
          const deleteRequests = chunkedItem.map((item) => ({
            DeleteRequest: {
              Key: { [pkColumn]: item[pkColumn], [skColumn]: item[skColumn] },
            },
          }));
          const command = new BatchWriteCommand({
            RequestItems: { [table]: deleteRequests },
          });
          return this.dynamo.send(command);
        }),
      );

      lastEvaluatedKey = data.LastEvaluatedKey;
    } while (lastEvaluatedKey);
  }

  public async getAllByIds(
    table: string,
    ids: Record<string, any>[],
  ): Promise<Record<string, any>[]> {
    const BATCH_SIZE = 100;
    const results: Record<string, any>[] = [];
    const batches = chunk(ids, BATCH_SIZE);

    for (const batch of batches) {
      const response = await this.dynamo.send(
        new BatchGetCommand({
          RequestItems: { [table]: { Keys: batch } },
        }),
      );

      const items = response.Responses?.[table] || [];
      results.push(...items);

      if (
        response.UnprocessedKeys &&
        Object.keys(response.UnprocessedKeys).length > 0
      ) {
        throw new Error('Some items could not be retrieved. Please retry.');
      }
    }

    return results;
  }

  public async putAll(
    table: string,
    items: Record<string, unknown>[],
  ): Promise<void> {
    const chunks = chunk(items, 10);
    for (const chunk of chunks) {
      const putRequests = chunk.map((item) => ({
        PutRequest: { Item: item },
      }));
      const command = new BatchWriteCommand({
        RequestItems: {
          [table]: putRequests,
        },
      });

      await this.dynamo.send(command);
    }
  }

  public async queryAll<T extends Record<string, any>>(
    queryInput: QueryCommandInput,
  ): Promise<T[]> {
    let lastEvaluatedKey = undefined;
    const allItems: T[] = [];

    do {
      const data: QueryCommandOutput = await this.dynamo.send(
        new QueryCommand({
          ...queryInput,
          ExclusiveStartKey: lastEvaluatedKey,
        }),
      );
      if (data.Items) allItems.push(...(data.Items as T[]));
      lastEvaluatedKey = data.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return allItems;
  }
}
