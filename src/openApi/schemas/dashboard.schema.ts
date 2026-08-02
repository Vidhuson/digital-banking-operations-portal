import { OpenAPIV3 } from "openapi-types";

export const dashboardSchemas: Record<string, OpenAPIV3.SchemaObject> = {

    DashboardCustomer: {
        type: "object",
        properties: {
            customerNumber: {
                type: "string",
                example: "CIF606597939"
            },
            name: {
                type: "string",
                example: "John Doe"
            },
            email: {
                type: "string",
                format: "email",
                example: "john@example.com"
            }
        }
    },

    DashboardAccountSummary: {
        type: "object",
        properties: {
            totalAccounts: {
                type: "integer",
                example: 3
            },
            activeAccounts: {
                type: "integer",
                example: 2
            },
            blockedAccounts: {
                type: "integer",
                example: 1
            },
            closedAccounts: {
                type: "integer",
                example: 0
            },
            totalBalance: {
                type: "number",
                example: 250000
            },
            currency: {
                type: "string",
                example: "INR"
            }
        }
    },

    DashboardAccount: {
        type: "object",
        properties: {
            accountNumber: {
                type: "string",
                example: "SB100001"
            },
            accountType: {
                type: "string",
                enum: [
                    "SAVINGS",
                    "CURRENT"
                ],
                example: "SAVINGS"
            },
            balance: {
                type: "number",
                example: 150000
            },
            currency: {
                type: "string",
                example: "INR"
            },
            status: {
                type: "string",
                enum: [
                    "ACTIVE",
                    "BLOCKED",
                    "CLOSED"
                ],
                example: "ACTIVE"
            }
        }
    },

    DashboardTransaction: {
        type: "object",
        properties: {
            transactionReference: {
                type: "string",
                example: "TXN100001"
            },
            accountNumber: {
                type: "string",
                example: "SB100001"
            },
            transactionType: {
                type: "string",
                enum: [
                    "DEPOSIT",
                    "WITHDRAW",
                    "TRANSFER"
                ],
                example: "DEPOSIT"
            },
            amount: {
                type: "number",
                example: 5000
            },
            status: {
                type: "string",
                enum: [
                    "PENDING",
                    "SUCCESS",
                    "FAILED"
                ],
                example: "SUCCESS"
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-07-23T09:30:00.000Z"
            }
        }
    },

    DashboardNotification: {
        type: "object",
        properties: {
            notificationNumber: {
                type: "string",
                example: "NOT100001"
            },
            title: {
                type: "string",
                example: "Account Credited"
            },
            message: {
                type: "string",
                example: "₹5,000 credited successfully."
            },
            type: {
                type: "string",
                enum: [
                    "SUCCESS",
                    "INFO",
                    "WARNING",
                    "ERROR"
                ],
                example: "SUCCESS"
            },
            isRead: {
                type: "boolean",
                example: false
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-07-23T09:30:00.000Z"
            }
        }
    },

    DashboardNotificationSummary: {
        type: "object",
        properties: {
            unreadCount: {
                type: "integer",
                example: 4
            },
            recentNotifications: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/DashboardNotification"
                }
            }
        }
    },

    CustomerDashboardResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Customer dashboard retrieved successfully."
            },
            data: {
                type: "object",
                properties: {
                    customer: {
                        $ref: "#/components/schemas/DashboardCustomer"
                    },
                    accountSummary: {
                        $ref: "#/components/schemas/DashboardAccountSummary"
                    },
                    accounts: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/DashboardAccount"
                        }
                    },
                    recentTransactions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/DashboardTransaction"
                        }
                    },
                    notificationSummary: {
                        $ref: "#/components/schemas/DashboardNotificationSummary"
                    }
                }
            }
        }
    }

};