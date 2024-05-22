import bodyParser from "body-parser";
import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  listCharacters,
  updateCharacter,
} from "./handlers/characterHandlers";
import { swaggerDocs } from "./swagger";
import { validationMiddleware } from "./middleware/validation";
import { CreateCharacterDto } from "./dtos/createCharacter.dto";

const app = express();

app.use(bodyParser.json());

// queryString parser middleware, not qs library beacuse it's simple
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/v1/characters/:id", getCharacter);
app.get("/api/v1/characters", listCharacters);
app.post(
  "/api/v1/characters",
  validationMiddleware(CreateCharacterDto),
  createCharacter
);
app.put(
  "/api/v1/characters/:id",
  validationMiddleware(CreateCharacterDto),
  updateCharacter
);
app.delete("/characters/:id", deleteCharacter);

swaggerDocs(app);

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
