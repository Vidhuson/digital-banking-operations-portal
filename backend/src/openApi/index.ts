import { OpenAPIV3 } from "openapi-types";

import { authPaths } from "./auth.swagger";
import { customerPaths } from "./customer.swagger";

import { authSchemas } from "./schemas/auth.schema";
import { commonSchemas } from "./schemas/common.schema";
import { customerSchemas } from "./schemas/customer.schema";
import { dashboardPaths } from "./dashboard.swagger";
import { dashboardSchemas } from "./schemas/dashboard.schema";
import { notificationPaths } from "./notification.swagger";
import { notificationSchemas } from "./schemas/notification.schema";
import { profileSchemas } from "./schemas/profile.schema";
import { profilePaths } from "./profile.swagger";

export const openApiDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",

    info: {
        title: "Digital Banking API",
        version: "1.0.0",
        description: "Enterprise Banking REST API"
    },

    servers: [
        {
            url: "/api/v1",
            description: "API V1"
        }
    ],

    tags: [
        {
            name: "Authentication",
            description: "Authentication APIs"
        },
        {
            name: "Customers",
            description: "Customer Management APIs"
        },
        {
            name: "Dashboard",
            description: "Dashboard APIs"
        },
        {
            name: "Notification",
            description: "Notification APIs"
        },
        {
            name: "Profile",
            description: "Profile APIs"
        }
    ],
    paths: {
        ...authPaths,
        ...customerPaths,
        ...dashboardPaths,
        ...notificationPaths,
        ...profilePaths
    },

    components: {
        schemas: {
            ...commonSchemas,
            ...authSchemas,
            ...customerSchemas,
            ...dashboardSchemas,
            ...notificationSchemas,
            ...profileSchemas
        },

        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },

        parameters: {
            CustomerNumber: {
                name: "customerNumber",
                in: "path",
                required: true,
                description: "Unique customer number",
                schema: {
                    type: "string",
                    example: "CIF606597939"
                }
            }
        },

        responses: {
            BadRequest: {
                description: "Validation failed."
            },

            Unauthorized: {
                description: "Authentication required."
            },

            Forbidden: {
                description: "Access denied."
            },

            NotFound: {
                description: "Resource not found."
            },

            Conflict: {
                description: "Resource already exists."
            },

            InternalServerError: {
                description: "Internal server error."
            }
        }
    }
};