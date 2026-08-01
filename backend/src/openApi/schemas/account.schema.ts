import { OpenAPIV3 } from "openapi-types";

export const accountSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    Account: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            accountNumber: {
                type: "string"
            },
            customerId: {
                type: "string",
                format: "uuid"
            },
            branchName: {
                type: "string"
            },
            ifscCode: {
                type: "string"
            },
            accountType: {
                type: "string",
                enum: ["SAVINGS", "CURRENT"]
            },
            balance: {
                type: "number"
            },
            currency: {
                type: "string",
                example: "INR"
            },
            status: {
                type: "string",
                enum: ["ACTIVE", "BLOCKED", "CLOSED"]
            },
            createdAt: {
                type: "string",
                format: "date-time"
            },
            updatedAt: {
                type: "string",
                format: "date-time"
            }
        }
    },
    CreateAccountRequest: {
        type: "object",
        required: ["customerNumber", "accountType"],
        properties: {
            customerNumber: {
                type: "string",
                example: "CIF606597939"
            },
            accountType: {
                type: "string",
                enum: ["SAVINGS", "CURRENT"]
            }
        }
    },
    UpdateAccountRequest: {
        type: "object",
        properties: {
            accountType: {
                type: "string",
                enum: ["SAVINGS", "CURRENT"]
            },
            status: {
                type: "string",
                enum: ["ACTIVE", "BLOCKED", "CLOSED"]
            },
            currency: {
                type: "string"
            }
        }
    },
    AccountResponse: {
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
                $ref: "#/components/schemas/Account"
            }
        }
    },
    AccountListResponse: {
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
                    $ref: "#/components/schemas/Account"
                }
            }
        }
    }
};
