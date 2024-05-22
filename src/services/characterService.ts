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

  async get(id: string) {}

  async list() {}

  async update(id: string, character: Omit<Character, "id">) {}

  async delete(id: string): Promise<void> {}
}
