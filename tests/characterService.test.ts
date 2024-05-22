import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { CharacterService } from "../src/services/characterService";
import { Character } from "../src/models/character";

// Mock the DynamoDbClient methods used in CharacterService
jest.mock("../src/services/dynamoDbClient", () => {
  return {
    DynamoDbClient: jest.fn().mockImplementation(() => {
      return {
        put: jest.fn(),
        get: jest.fn(),
        scan: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
    }),
  };
});

const dynamoDbMock = mockClient(DynamoDBDocumentClient);
const characterService = new CharacterService();

describe("CharacterService", () => {
  let generatedId: string;

  afterEach(() => {
    dynamoDbMock.reset();
  });

  it("should create a new character", async () => {
    const newCharacter = {
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    };

    dynamoDbMock.on(PutCommand).resolves({});

    const character = await characterService.create(newCharacter);

    expect(character).toHaveProperty("id");
    expect(character).toMatchObject(newCharacter);
    generatedId = character.id;
  });

  it("should not create a character without a name", async () => {
    await expect(
      characterService.create({
        episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      } as Omit<Character, "id">)
    ).rejects.toThrow("Validation Error: Name and episodes are required");
  });

  it("should not create a character without episodes", async () => {
    await expect(
      characterService.create({ name: "Han Solo" } as Omit<Character, "id">)
    ).rejects.toThrow("Validation Error: Name and episodes are required");
  });

  it("should handle errors during creation", async () => {
    dynamoDbMock
      .on(PutCommand)
      .rejects(new Error("Internal Server Error: Error creating character"));
    await expect(
      characterService.create({
        name: "Han Solo",
        episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      })
    ).rejects.toThrow("Internal Server Error: Error creating character");
  });

  it("should get a character by ID", async () => {
    const mockCharacter = {
      id: generatedId,
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    };

    dynamoDbMock.on(GetCommand).resolves({ Item: mockCharacter });

    const character = await characterService.get(generatedId);
    expect(character).toEqual(mockCharacter);
  });

  it("should list characters", async () => {
    const mockCharacters = [
      {
        id: generatedId,
        name: "Han Solo",
        episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
        planet: "Tatooine",
      },
    ];

    dynamoDbMock.on(ScanCommand).resolves({ Items: mockCharacters });

    const result = await characterService.list(10);
    expect(result.characters).toEqual(mockCharacters);
    expect(result).toHaveProperty("lastKey", undefined); // As lastKey is not set in this test case
  });

  it("should update a character by ID", async () => {
    const updatedCharacter = {
      id: generatedId,
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    };

    dynamoDbMock.on(UpdateCommand).resolves({ Attributes: updatedCharacter });

    const character = await characterService.update(generatedId, {
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    });
    expect(character).toEqual(updatedCharacter);
  });

  it("should delete a character by ID", async () => {
    const mockCharacter = {
      id: generatedId,
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    };

    dynamoDbMock.on(DeleteCommand).resolves({ Attributes: mockCharacter });

    const character = await characterService.delete(generatedId);
    expect(character).toEqual(mockCharacter);
  });

  it("should handle errors during get", async () => {
    dynamoDbMock
      .on(GetCommand)
      .rejects(new Error("Internal Server Error: Error getting character"));
    await expect(characterService.get(generatedId)).rejects.toThrow(
      "Internal Server Error: Error getting character"
    );
  });

  it("should handle errors during listing", async () => {
    dynamoDbMock
      .on(ScanCommand)
      .rejects(new Error("Internal Server Error: Error listing characters"));
    await expect(characterService.list(10)).rejects.toThrow(
      "Internal Server Error: Error listing characters"
    );
  });

  it("should handle errors during update", async () => {
    dynamoDbMock
      .on(UpdateCommand)
      .rejects(new Error("Internal Server Error: Error updating character"));
    await expect(
      characterService.update(generatedId, {
        name: "Han Solo",
        episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
        planet: "Tatooine",
      })
    ).rejects.toThrow("Internal Server Error: Error updating character");
  });

  it("should handle errors during deletion", async () => {
    dynamoDbMock
      .on(DeleteCommand)
      .rejects(new Error("Internal Server Error: Error deleting character"));
    await expect(characterService.delete(generatedId)).rejects.toThrow(
      "Internal Server Error: Error deleting character"
    );
  });

  it("should handle not found errors during get", async () => {
    dynamoDbMock.on(GetCommand).resolves({ Item: undefined });
    await expect(characterService.get(generatedId)).rejects.toThrow(
      `Character with ID "${generatedId}" not found`
    );
  });
});
