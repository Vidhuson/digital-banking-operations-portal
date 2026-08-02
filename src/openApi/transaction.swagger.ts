import { OpenAPIV3 } from "openapi-types";

export const transactionPaths: OpenAPIV3.PathsObject = {
    "/transactions/deposit": {
        post: {
            tags: ["Transaction"],
            summary: "Deposit",
            description: "Deposits funds into a customer account.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/DepositRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Deposit successful.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/DepositResponse"
                            }
                        }
                    }
                },
                "400": {
                    $ref: "#/components/responses/BadRequest"
                },
                "401": {
                    $ref: "#/components/responses/Unauthorized"
                },
                "403": {
                    $ref: "#/components/responses/Forbidden"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },
    "/transactions/withdraw": {
        post: {
            tags: ["Transaction"],
            summary: "Withdraw",
            description: "Withdraws funds from a customer account.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/WithdrawRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Withdrawal successful.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/WithdrawResponse"
                            }
                        }
                    }
                },
                "400": {
                    $ref: "#/components/responses/BadRequest"
                },
                "401": {
                    $ref: "#/components/responses/Unauthorized"
                },
                "403": {
                    $ref: "#/components/responses/Forbidden"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },
    "/transactions/fund-transfer": {
        post: {
            tags: ["Transaction"],
            summary: "Fund Transfer",
            description: "Transfers funds from one account to another.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/FundTransferRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Fund transfer completed successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/FundTransferResponse"
                            }
                        }
                    }
                },
                "400": {
                    $ref: "#/components/responses/BadRequest"
                },
                "401": {
                    $ref: "#/components/responses/Unauthorized"
                },
                "403": {
                    $ref: "#/components/responses/Forbidden"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },
    "/transactions": {
        get: {
            tags: ["Transaction"],
            summary: "Search Transactions",
            description: "Searches transactions based on filters.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "transactionReference",
                    in: "query",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "accountNumber",
                    in: "query",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "transactionType",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["DEPOSIT", "WITHDRAW", "FUND_TRANSFER"]
                    }
                },
                {
                    name: "transactionMode",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["CREDIT", "DEBIT"]
                    }
                },
                {
                    name: "status",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["PENDING", "SUCCESS", "FAILED"]
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Transactions retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/TransactionListResponse"
                            }
                        }
                    }
                },
                "401": {
                    $ref: "#/components/responses/Unauthorized"
                },
                "403": {
                    $ref: "#/components/responses/Forbidden"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    }
};
