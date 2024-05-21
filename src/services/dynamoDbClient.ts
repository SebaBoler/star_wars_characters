import { DynamoDB } from "aws-sdk";
import { Character } from "../models/character";

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME ?? "Characters";

async function putItem(item: Character): Promise<void> {
  await dynamoDb
    .put({
      TableName: TABLE_NAME,
      Item: item,
    })
    .promise();
}

async function getItem(id: string): Promise<Character> {
  const result = await dynamoDb
    .get({
      TableName: TABLE_NAME,
      Key: { id },
    })
    .promise();
  return result.Item as Character;
}

async function scanItems(): Promise<Character[]> {
  const result = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
  return result.Items as Character[];
}

async function updateItem(id: string, item: Character): Promise<void> {
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

async function deleteItem(id: string): Promise<void> {
  await dynamoDb
    .delete({
      TableName: TABLE_NAME,
      Key: { id },
    })
    .promise();
}

async function itemExists(id: string): Promise<boolean> {
  const result = await dynamoDb
    .get({
      TableName: TABLE_NAME,
      Key: { id },
    })
    .promise();
  return !!result.Item;
}

export { putItem, getItem, scanItems, updateItem, deleteItem, itemExists };
