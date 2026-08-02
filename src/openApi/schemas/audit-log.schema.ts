import { OpenAPIV3 } from "openapi-types";

export const auditLogSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    AuditLog: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            auditReference: {
                type: "string"
            },
            userNumber: {
                type: "string"
            },
            userRole: {
                type: "string",
                enum: ["ADMIN", "EMPLOYEE", "CUSTOMER"]
            },
            module: {
                type: "string",
                enum: ["AUTH", "CUSTOMER", "ACCOUNT", "TRANSACTION", "DASHBOARD"]
            },
            action: {
                type: "string",
                enum: [
                    "SIGNUP",
                    "LOGIN",
                    "CHANGEPASSWORD",
                    "CREATE_CUSTOMER",
                    "UPDATE_CUSTOMER",
                    "DELETE_CUSTOMER",
                    "APPROVE_CUSTOMER",
                    "REJECT_CUSTOMER",
                    "CREATE_ACCOUNT",
                    "UPDATE_ACCOUNT",
                    "DELETE_ACCOUNT",
                    "DEPOSIT",
                    "WITHDRAW",
                    "FUND_TRANSFER",
                    "VIEW_CUSTOMER_DASHBOARD",
                    "VIEW_ADMIN_DASHBOARD"
                ]
            },
            entityReference: {
                type: "string",
                nullable: true
            },
            status: {
                type: "string",
                enum: ["SUCCESS", "FAILURE"]
            },
            description: {
                type: "string"
            },
            createdAt: {
                type: "string",
                format: "date-time"
            }
        }
    },
    AuditLogListResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string"
            },
            data: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/AuditLog"
                }
            }
        }
    }
};
