import { Character } from "../models/character";
import { v4 as uuidv4 } from "uuid";
import { DynamoDbClient } from "./dynamoDbClient";

export class CharacterService {
  private readonly dynamoDbClient: DynamoDbClient;

  constructor() {
    this.dynamoDbClient = new DynamoDbClient();
  }

  async create(character: Omit<Character, "id">): Promise<Character> {
    if (!character.name || !character.episodes) {
      throw new Error("Validation Error: Name and episodes are required");
    }
    const newCharacter = { id: uuidv4(), ...character };
    try {
      await this.dynamoDbClient.put(newCharacter);
    } catch (error) {
      console.error("Error creating character", error);
      throw new Error("Internal Server Error: Error creating character");
    }
    return newCharacter;
  }

  async get(id: string): Promise<Character> {
    try {
      if (!id) {
        throw new Error("Validation Error: ID is required");
      }
      const character = await this.dynamoDbClient.get(id);
      if (!character) {
        throw new Error(`Character with ID "${id}" not found`);
      }
      return character;
    } catch (error) {
      console.error("Error fetching character", error);
      throw new Error("Internal Server Error: Error fetching character");
    }
  }

  async list(
    limit: number,
    lastKey?: string
  ): Promise<{ characters: Character[]; lastKey?: string }> {
    try {
      const result = await this.dynamoDbClient.scan(limit, lastKey);
      return result;
    } catch (error) {
      console.error("Error listing characters", error);
      throw new Error("Internal Server Error: Error listing characters");
    }
  }

  async update(id: string, character: Partial<Character>): Promise<Character> {
    try {
      const updatedCharacter = await this.dynamoDbClient.update(id, character);
      return updatedCharacter;
    } catch (error) {
      console.error("Error updating character", error);
      throw new Error("Internal Server Error: Error updating character");
    }
  }

  async delete(id: string): Promise<Character> {
    try {
      const deletedCharacter = await this.dynamoDbClient.delete(id);
      if (!deletedCharacter) {
        throw new Error(`Character with ID "${id}" not found`);
      }
      return deletedCharacter;
    } catch (error) {
      console.error("Error deleting character", error);
      throw new Error("Internal Server Error: Error deleting character");
    }
  }
}
