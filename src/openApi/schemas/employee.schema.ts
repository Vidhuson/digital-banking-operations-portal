import { OpenAPIV3 } from "openapi-types";

export const employeeSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    EmployeeDashboardSummary: {
        type: "object",
        properties: {
            totalCustomers: {
                type: "integer"
            },
            totalAccounts: {
                type: "integer"
            },
            todayCustomers: {
                type: "integer"
            },
            todayAccounts: {
                type: "integer"
            },
            todayTransactions: {
                type: "integer"
            },
            todayTransactionAmount: {
                type: "number"
            }
        }
    },
    EmployeeDashboardCustomer: {
        type: "object",
        properties: {
            customerNumber: {
                type: "string"
            },
            fullName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            mobileNumber: {
                type: "string"
            },
            createdAt: {
                type: "string",
                format: "date-time"
            }
        }
    },
    EmployeeDashboardTransaction: {
        type: "object",
        properties: {
            transactionReference: {
                type: "string"
            },
            accountNumber: {
                type: "string"
            },
            transactionType: {
                type: "string",
                enum: ["DEPOSIT", "WITHDRAW", "FUND_TRANSFER"]
            },
            transactionMode: {
                type: "string",
                enum: ["CREDIT", "DEBIT"]
            },
            amount: {
                type: "number"
            },
            status: {
                type: "string",
                enum: ["PENDING", "SUCCESS", "FAILED"]
            },
            createdAt: {
                type: "string",
                format: "date-time"
            }
        }
    },
    EmployeeDashboardResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Employee dashboard fetched successfully."
            },
            data: {
                type: "object",
                properties: {
                    summary: {
                        $ref: "#/components/schemas/EmployeeDashboardSummary"
                    },
                    recentCustomers: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/EmployeeDashboardCustomer"
                        }
                    },
                    recentTransactions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/EmployeeDashboardTransaction"
                        }
                    }
                }
            }
        }
    }
};
