import bodyParser from "body-parser";
import express from "express";
import { createCharacter } from "./handlers/createCharacter";
import { swaggerDocs } from "./swagger";
import { validationMiddleware } from "./middleware/validation";
import { CreateCharacterDto } from "./dtos/createCharacter.dto";

const app = express();

app.use(bodyParser.json());

// queryString parser middleware, not qs library beacuse it's simple
app.use(bodyParser.urlencoded({ extended: false }));

app.post(
  "/api/v1/characters",
  validationMiddleware(CreateCharacterDto),
  createCharacter
);

swaggerDocs(app);

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
