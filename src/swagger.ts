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
    components: {
      schemas: {
        Character: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            episodes: {
              type: "array",
              items: {
                type: "string",
              },
            },
            planet: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/handlers/*.ts", "./src/swaggerDocs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
