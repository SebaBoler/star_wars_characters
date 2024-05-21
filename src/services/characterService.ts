import { DynamoDB } from "aws-sdk";
import { Character } from "../models/character";
import { v4 as uuidv4 } from "uuid";

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "Characters";

export class CharacterService {
  async create(character: Omit<Character, "id">): Promise<Character> {
    const newCharacter = { id: uuidv4(), ...character };
    try {
      await this.putItem(newCharacter);
      return newCharacter;
    } catch (error) {
      console.error("Error creating character", error);
      throw error;
    }
  }

  async get(id: string) {}

  async list() {}

  async update(id: string, character: Omit<Character, "id">) {}

  async delete(id: string): Promise<void> {}

  private async putItem(item: Character): Promise<void> {
    await dynamoDb
      .put({
        TableName: TABLE_NAME,
        Item: item,
      })
      .promise();
  }

  private async getItem(id: string): Promise<Character> {
    const result = await dynamoDb
      .get({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();
    return result.Item as Character;
  }

  private async scanItems(): Promise<Character[]> {
    const result = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
    return result.Items as Character[];
  }

  private async updateItem(id: string, item: Character): Promise<void> {
    await dynamoDb
      .update({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression:
          "SET #name = :name, episodes = :episodes, planet = :planet",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": item.name,
          ":episodes": item.episodes,
          ":planet": item.planet,
        },
      })
      .promise();
  }

  private async deleteItem(id: string): Promise<void> {
    await dynamoDb
      .delete({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();
  }

  private async itemExists(id: string): Promise<boolean> {
    const result = await dynamoDb
      .get({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();
    return !!result.Item;
  }
}
