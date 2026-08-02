import { OpenAPIV3 } from "openapi-types";

export const transactionSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    DepositRequest: {
        type: "object",
        required: ["accountNumber", "amount", "transactionChannel"],
        properties: {
            accountNumber: {
                type: "string"
            },
            amount: {
                type: "number"
            },
            transactionChannel: {
                type: "string",
                enum: ["BRANCH", "ATM", "INTERNET_BANKING", "MOBILE_BANKING"]
            },
            remarks: {
                type: "string",
                nullable: true
            }
        }
    },
    DepositResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Amount deposited successfully."
            },
            data: {
                type: "object",
                properties: {
                    transactionReference: {
                        type: "string"
                    },
                    accountNumber: {
                        type: "string"
                    },
                    depositedAmount: {
                        type: "number"
                    },
                    availableBalance: {
                        type: "number"
                    }
                }
            }
        }
    },
    WithdrawRequest: {
        type: "object",
        required: ["accountNumber", "amount", "transactionChannel"],
        properties: {
            accountNumber: {
                type: "string"
            },
            amount: {
                type: "number"
            },
            transactionChannel: {
                type: "string",
                enum: ["BRANCH", "ATM", "INTERNET_BANKING", "MOBILE_BANKING"]
            },
            remarks: {
                type: "string",
                nullable: true
            }
        }
    },
    WithdrawResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Amount withdrawn successfully."
            },
            data: {
                type: "object",
                properties: {
                    transactionReference: {
                        type: "string"
                    },
                    accountNumber: {
                        type: "string"
                    },
                    withdrawnAmount: {
                        type: "number"
                    },
                    availableBalance: {
                        type: "number"
                    }
                }
            }
        }
    },
    FundTransferRequest: {
        type: "object",
        required: ["fromAccountNumber", "toAccountNumber", "amount", "transactionChannel"],
        properties: {
            fromAccountNumber: {
                type: "string"
            },
            toAccountNumber: {
                type: "string"
            },
            amount: {
                type: "number"
            },
            transactionChannel: {
                type: "string",
                enum: ["BRANCH", "ATM", "INTERNET_BANKING", "MOBILE_BANKING"]
            },
            remarks: {
                type: "string",
                nullable: true
            }
        }
    },
    FundTransferResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Fund transfer completed successfully."
            },
            data: {
                type: "object",
                properties: {
                    fundTransferReference: {
                        type: "string"
                    },
                    fromAccountNumber: {
                        type: "string"
                    },
                    toAccountNumber: {
                        type: "string"
                    },
                    transferredAmount: {
                        type: "number"
                    },
                    senderAvailableBalance: {
                        type: "number"
                    },
                    receiverAvailableBalance: {
                        type: "number"
                    }
                }
            }
        }
    },
    Transaction: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            transactionReference: {
                type: "string"
            },
            accountId: {
                type: "string",
                format: "uuid"
            },
            accountNumber: {
                type: "string"
            },
            counterpartyAccountNumber: {
                type: "string",
                nullable: true
            },
            transactionType: {
                type: "string",
                enum: ["DEPOSIT", "WITHDRAW", "FUND_TRANSFER"]
            },
            transactionMode: {
                type: "string",
                enum: ["CREDIT", "DEBIT"]
            },
            transactionChannel: {
                type: "string",
                enum: ["BRANCH", "ATM", "INTERNET_BANKING", "MOBILE_BANKING"]
            },
            amount: {
                type: "number"
            },
            openingBalance: {
                type: "number"
            },
            closingBalance: {
                type: "number"
            },
            status: {
                type: "string",
                enum: ["PENDING", "SUCCESS", "FAILED"]
            },
            remarks: {
                type: "string",
                nullable: true
            },
            sourceReference: {
                type: "string",
                nullable: true
            },
            createdAt: {
                type: "string",
                format: "date-time"
            }
        }
    },
    TransactionListResponse: {
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
                    $ref: "#/components/schemas/Transaction"
                }
            }
        }
    }
};
