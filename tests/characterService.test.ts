import { jest } from "@jest/globals";
import { CharacterService } from "../src/services/characterService";
import { DynamoDbClient } from "../src/services/dynamoDbClient";
import { Character } from "../src/models/character";
import { v4 as uuidv4 } from "uuid";

jest.mock("../src/services/dynamoDbClient");

describe("CharacterService", () => {
  let mockDynamoDbClient: jest.Mocked<DynamoDbClient>;
  let characterService: CharacterService;
  let randomId: string;

  beforeEach(() => {
    mockDynamoDbClient = new DynamoDbClient() as jest.Mocked<DynamoDbClient>;
    characterService = new CharacterService(mockDynamoDbClient);
    randomId = uuidv4();
  });

  it("should return list with both input value parameters", async () => {
    const firstKey: string = uuidv4();
    const lastKey: string = uuidv4();
    const mockCharacters: Character[] = [
      { id: firstKey, name: "Han Solo", episodes: ["Episode 1"] },
      { id: uuidv4(), name: "Luke Skywalker", episodes: ["Episode 2"] },
      { id: lastKey, name: "Leia Organa", episodes: ["Episode 3"] },
    ];
    const mockLastKey = lastKey;
    mockDynamoDbClient.scan.mockResolvedValue({
      characters: mockCharacters,
      lastKey: mockLastKey,
    });

    const result = await characterService.list(2, firstKey);
    expect(result.characters).toEqual(mockCharacters);
    expect(result.lastKey).toEqual(mockLastKey);
  });

  it("should return error when list", async () => {
    mockDynamoDbClient.scan.mockRejectedValue(
      new Error("Internal Server Error: Error listing characters")
    );
    await expect(characterService.list(2)).rejects.toThrow(
      "Internal Server Error: Error listing characters"
    );
  });

  it("should return empty list", async () => {
    mockDynamoDbClient.scan.mockResolvedValue({
      characters: [],
      lastKey: undefined,
    });
    const result = await characterService.list(2);
    expect(result.characters).toEqual([]);
    expect(result.lastKey).toBeUndefined();
  });

  it("should create a new character", async () => {
    const newCharacter = { name: "Leia Organa", episodes: ["Episode 1"] };
    const result = await characterService.create(newCharacter);
    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("string");
    expect(result.id.length).toBe(36);
    expect(result.name).toEqual(newCharacter.name);
    expect(result.episodes).toEqual(newCharacter.episodes);
  });

  it("should not create a character without a name", async () => {
    const character = { episodes: ["Episode 1"] };
    await expect(characterService.create(character as any)).rejects.toThrow(
      "Validation Error: Name and episodes are required"
    );
  });

  it("should not create a character without episodes", async () => {
    const character = { name: "Leia Organa" };
    await expect(characterService.create(character as any)).rejects.toThrow(
      "Validation Error: Name and episodes are required"
    );
  });

  it("should get a character by ID", async () => {
    const character = {
      id: randomId,
      name: "Han Solo",
      episodes: ["Episode 1"],
    };
    mockDynamoDbClient.get.mockResolvedValue(character);
    await expect(characterService.get(randomId)).resolves.toEqual(character);
  });

  it("should update a character by ID", async () => {
    const updates = { name: "Updated Name" };
    const updatedCharacter = {
      id: randomId,
      name: "Han Solo Junior",
      episodes: ["Episode 1"],
    };
    mockDynamoDbClient.update.mockResolvedValue(updatedCharacter);
    await expect(characterService.update(randomId, updates)).resolves.toEqual(
      updatedCharacter
    );
  });

  it("should delete a character by ID", async () => {
    const character = {
      id: randomId,
      name: "Han Solo",
      episodes: ["Episode 1"],
    };
    mockDynamoDbClient.delete.mockResolvedValue(character);
    await expect(characterService.delete(randomId)).resolves.toEqual(character);
  });

  it("should handle errors during get", async () => {
    mockDynamoDbClient.get.mockRejectedValue(
      new Error("Internal Server Error")
    );
    await expect(characterService.get(randomId)).rejects.toThrow(
      "Internal Server Error: Error fetching character"
    );
  });

  it("should handle errors during update", async () => {
    const updates = { name: "Dark Han Solo" };
    mockDynamoDbClient.update.mockRejectedValue(
      new Error("Internal Server Error")
    );
    await expect(characterService.update(randomId, updates)).rejects.toThrow(
      "Internal Server Error: Error updating character"
    );
  });

  it("should throw an error when id is not provided", async () => {
    await expect(characterService.get("")).rejects.toThrow(
      "Validation Error: ID is required"
    );
  });

  it("should handle not found errors during get", async () => {
    mockDynamoDbClient.get.mockResolvedValue(null);
    await expect(characterService.get("nonexistent")).rejects.toThrow(
      'Not Found: Character with ID "nonexistent" not found'
    );
  });
});
