import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Star Wars Characters API",
      version: "0.0.1",
      description: "A simple Star Wars API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/handlers/*.ts", "./src/swaggerDocs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
