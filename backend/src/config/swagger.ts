import swaggerJsdoc from "swagger-jsdoc";
import { commonSchemas } from "../docs/schemas/common.schema";
import { authSchemas } from "../docs/schemas/auth.schema";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Digital Banking API",
      version: "1.0.0",
      description: "Enterprise Banking REST API"
    },
    servers: [
      {
        url: "/api/v1",
        description: "API v1"
      }
    ],
    components: {
      schemas: {
        ...commonSchemas,
        ...authSchemas
      }
    }

  },
  apis: ["./src/docs/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;