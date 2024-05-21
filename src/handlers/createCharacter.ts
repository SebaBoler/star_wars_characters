import { Request, Response } from "express";
import { CharacterService } from "../services/characterService";

const characterService = new CharacterService();

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const character = await characterService.create(req.body);
    res.status(201).json(character);
  } catch (error) {
    console.error("Error creating character", error);
    handleError(res, error);
  }
};

function handleError(res: Response, error: any) {
  console.error("Error:", error.message);
  if (error.message.includes("Validation Error")) {
    res.status(400).json({ error: error.message });
  } else if (error.message.includes("Character with ID")) {
    res.status(404).json({ error: error.message });
  } else {
    res.status(500).json({ error: error.message });
  }
}
