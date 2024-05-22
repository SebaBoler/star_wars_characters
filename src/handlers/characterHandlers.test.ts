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
import { CharacterService } from "../services/characterService";

const dynamoDbMock = mockClient(DynamoDBDocumentClient);

const characterService = new CharacterService();

describe("CharacterService", () => {
  let generatedId: string;

  afterEach(() => {
    dynamoDbMock.reset();
  });

  it("should create a character", async () => {
    const mockCharacter = {
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    };

    dynamoDbMock.on(PutCommand).resolves({});

    const character = await characterService.create({
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    });

    generatedId = character.id;
    const { id, ...characterWithoutId } = character;

    expect(characterWithoutId).toMatchObject(mockCharacter);
  });

  it("should not create a character without a name", async () => {
    await expect(
      characterService.create({
        name: "",
        episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      })
    ).rejects.toThrow("Validation Error: Name and episodes are required");
  });

  it("should not create a character without episodes", async () => {
    await expect(
      characterService.create({ name: "Han Solo", episodes: [] })
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

  it("should get a character", async () => {
    const mockCharacter = {
      id: "1",
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
        id: "1",
        name: "Han Solo",
        episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
        planet: "Tatooine",
      },
    ];

    dynamoDbMock.on(ScanCommand).resolves({ Items: mockCharacters });

    const characters = await characterService.list(10);
    expect(characters).toEqual(mockCharacters);
    expect(characters.characters.length).toBe(1);
  });

  it("should update a character", async () => {
    const updatedCharacter = {
      id: "1",
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

  it("should delete a character", async () => {
    const mockCharacter = {
      id: "1",
      name: "Han Solo",
      episodes: ["NEWHOPE", "EMPIRE", "JEDI"],
      planet: "Tatooine",
    };

    dynamoDbMock.on(DeleteCommand).resolves({ Attributes: mockCharacter });

    const character = await characterService.remove(generatedId);
    expect(character).toEqual(mockCharacter);
  });

  it("should handle errors during get", async () => {
    dynamoDbMock
      .on(GetCommand)
      .rejects(new Error("Internal Server Error: Error getting character"));
    await expect(characterService.findOne(generatedId)).rejects.toThrow(
      "Internal Server Error: Error getting character"
    );
  });

  it("should handle errors during listing", async () => {
    dynamoDbMock
      .on(ScanCommand)
      .rejects(new Error("Internal Server Error: Error listing characters"));
    await expect(characterService.findAll()).rejects.toThrow(
      "Internal Server Error: Error listing characters"
    );
  });

  it("should handle errors during update", async () => {
    dynamoDbMock
      .on(UpdateCommand)
      .rejects(new Error("Internal Server Error: Error updating character"));
    await expect(
      characterService.update("1", {
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
    await expect(characterService.remove(generatedId)).rejects.toThrow(
      "Internal Server Error: Error deleting character"
    );
  });

  it("should handle not found errors during get", async () => {
    dynamoDbMock.on(GetCommand).resolves({ Item: null });
    await expect(characterService.findOne(generatedId)).rejects.toThrow(
      'Character with ID "1" not found'
    );
  });
});
