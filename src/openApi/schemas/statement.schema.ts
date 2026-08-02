import { OpenAPIV3 } from "openapi-types";

export const statementSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    StatementAccount: {
        type: "object",
        properties: {
            accountNumber: {
                type: "string",
                example: "4012123412341234"
            },
            accountType: {
                type: "string",
                enum: [
                    "SAVINGS",
                    "CURRENT"
                ],
                example: "SAVINGS"
            },
            branchName: {
                type: "string",
                example: "Chennai Main Branch"
            },
            balance: {
                type: "number",
                example: 25000
            },
            currency: {
                type: "string",
                example: "INR"
            }
        }
    },

    StatementSummary: {
        type: "object",
        properties: {
            openingBalance: {
                type: "number",
                example: 20000
            },
            closingBalance: {
                type: "number",
                example: 25000
            },
            totalCredits: {
                type: "number",
                example: 15000
            },
            totalDebits: {
                type: "number",
                example: 10000
            },
            transactionCount: {
                type: "integer",
                example: 8
            }
        }
    },

    StatementTransaction: {
        type: "object",
        properties: {
            transactionReference: {
                type: "string",
                example: "TXN2026073180340026"
            },
            transactionType: {
                type: "string",
                enum: [
                    "DEPOSIT",
                    "WITHDRAW",
                    "FUND_TRANSFER"
                ]
            },
            transactionMode: {
                type: "string",
                example: "UPI"
            },
            amount: {
                type: "number",
                example: 5000
            },
            status: {
                type: "string",
                example: "SUCCESS"
            },
            remarks: {
                type: "string",
                nullable: true,
                example: "Monthly Salary"
            },
            createdAt: {
                type: "string",
                format: "date-time"
            }
        }
    },

    StatementResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Statement retrieved successfully."
            },
            data: {
                type: "object",
                properties: {
                    account: {
                        $ref: "#/components/schemas/StatementAccount"
                    },
                    summary: {
                        $ref: "#/components/schemas/StatementSummary"
                    },
                    transactions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/StatementTransaction"
                        }
                    }
                }
            }
        }
    }
};