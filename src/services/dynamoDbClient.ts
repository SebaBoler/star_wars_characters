import { DynamoDBClient, ReturnValue } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Character } from "../models/character";
import dotenv from "dotenv";

dotenv.config();

const dynamoDb = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
export const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDb);

// const TABLE_NAME = process.env.TABLE_NAME ?? "Characters";

export class DynamoDbClient {
  private readonly tableName = "Characters";

  async put(item: Character): Promise<void> {
    await dynamoDBDocumentClient.send(
      new PutCommand({ TableName: this.tableName, Item: item })
    );
  }

  async get(id: string): Promise<Character | null> {
    const result = await dynamoDBDocumentClient.send(
      new GetCommand({ TableName: this.tableName, Key: { id } })
    );
    return (result.Item as Character) || null;
  }

  async scan(
    limit: number,
    lastKey?: string
  ): Promise<{ characters: Character[]; lastKey?: string }> {
    const params: any = {
      TableName: this.tableName,
      Limit: limit,
    };

    if (lastKey) {
      params.ExclusiveStartKey = { id: lastKey };
    }

    const result = await dynamoDBDocumentClient.send(new ScanCommand(params));

    const characters = result.Items as Character[];
    const lastEvaluatedKey = result.LastEvaluatedKey
      ? result.LastEvaluatedKey.id
      : undefined;

    return { characters, lastKey: lastEvaluatedKey };
  }

  async update(id: string, character: Partial<Character>): Promise<Character> {
    const updateParams = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression:
        "SET #name = :name, episodes = :episodes, planet = :planet",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {
        ":name": character?.name,
        ":episodes": character?.episodes,
        ":planet": character?.planet,
      },
      ReturnValues: "ALL_NEW" as ReturnValue,
    };
    const result = await dynamoDBDocumentClient.send(
      new UpdateCommand(updateParams)
    );
    return result.Attributes as Character;
  }

  async delete(id: string): Promise<Character> {
    const result = await dynamoDBDocumentClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
        ReturnValues: "ALL_OLD",
      })
    );
    return result.Attributes as Character;
  }
}
