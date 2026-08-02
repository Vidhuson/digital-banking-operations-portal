import { OpenAPIV3 } from "openapi-types";

import { authPaths } from "./auth.swagger";
import { customerPaths } from "./customer.swagger";
import { accountPaths } from "./account.swagger";
import { transactionPaths } from "./transaction.swagger";
import { auditLogPaths } from "./audit-log.swagger";
import { employeePaths } from "./employee.swagger";

import { authSchemas } from "./schemas/auth.schema";
import { commonSchemas } from "./schemas/common.schema";
import { customerSchemas } from "./schemas/customer.schema";
import { accountSchemas } from "./schemas/account.schema";
import { transactionSchemas } from "./schemas/transaction.schema";
import { auditLogSchemas } from "./schemas/audit-log.schema";
import { employeeSchemas } from "./schemas/employee.schema";
import { dashboardPaths } from "./dashboard.swagger";
import { dashboardSchemas } from "./schemas/dashboard.schema";
import { notificationPaths } from "./notification.swagger";
import { notificationSchemas } from "./schemas/notification.schema";
import { profileSchemas } from "./schemas/profile.schema";
import { profilePaths } from "./profile.swagger";
import { supportSchemas } from "./schemas/support.schema";
import { supportPaths } from "./support.swagger";
import { statementPaths } from "./statement.swagger";
import { statementSchemas } from "./schemas/statement.schema";

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
            name: "Customer",
            description: "Customer Management APIs"
        },
        {
            name: "Account",
            description: "Account Management APIs"
        },
        {
            name: "Transaction",
            description: "Transaction APIs"
        },
        {
            name: "AuditLog",
            description: "Audit Log APIs"
        },
        {
            name: "Employee",
            description: "Employee Dashboard APIs"
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
            name: "Support",
            description: "Customer Support APIs"
        },
        {
            name: "Profile",
            description: "Profile APIs"
        },
        {
            name: "Statement",
            description: "Account Statement APIs"
        }
    ],
    paths: {
        ...authPaths,
        ...customerPaths,
        ...accountPaths,
        ...transactionPaths,
        ...auditLogPaths,
        ...employeePaths,
        ...dashboardPaths,
        ...notificationPaths,
        ...profilePaths,
        ...supportPaths,
        ...statementPaths
    },

    components: {
        schemas: {
            ...commonSchemas,
            ...authSchemas,
            ...customerSchemas,
            ...accountSchemas,
            ...transactionSchemas,
            ...auditLogSchemas,
            ...employeeSchemas,
            ...dashboardSchemas,
            ...notificationSchemas,
            ...profileSchemas,
            ...supportSchemas,
            ...statementSchemas
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