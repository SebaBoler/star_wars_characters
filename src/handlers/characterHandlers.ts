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

export const getCharacter = async (req: Request, res: Response) => {
  try {
    const character = await characterService.get(req.params.id);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character", error);
    handleError(res, error);
  }
};

export const listCharacters = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const lastKey = req.query.lastKey as string;
    const result = await characterService.list(limit, lastKey);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error listing characters", error);
    handleError(res, error);
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const character = await characterService.update(req.params.id, req.body);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error updating character", error);
    handleError(res, error);
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    await characterService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting character", error);
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
