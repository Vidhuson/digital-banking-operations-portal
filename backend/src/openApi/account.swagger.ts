import { OpenAPIV3 } from "openapi-types";

export const accountPaths: OpenAPIV3.PathsObject = {
    "/accounts": {
        post: {
            tags: ["Account"],
            summary: "Create Account",
            description: "Creates a new bank account for a customer.",
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
                            $ref: "#/components/schemas/CreateAccountRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Account created successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AccountResponse"
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
        },
        get: {
            tags: ["Account"],
            summary: "Get All Accounts",
            description: "Returns all accounts belonging to the authenticated customer.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                "200": {
                    description: "Accounts fetched successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AccountListResponse"
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
    },
    "/accounts/{id}": {
        get: {
            tags: ["Account"],
            summary: "Get Account by ID",
            description: "Returns a single account by its unique ID.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Account fetched successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AccountResponse"
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
                "404": {
                    $ref: "#/components/responses/NotFound"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        },
        put: {
            tags: ["Account"],
            summary: "Update Account",
            description: "Updates account details such as account type, status, or currency.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UpdateAccountRequest"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Account updated successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AccountResponse"
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
                "404": {
                    $ref: "#/components/responses/NotFound"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        },
        delete: {
            tags: ["Account"],
            summary: "Delete Account",
            description: "Deletes an account by ID.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Account deleted successfully."
                },
                "401": {
                    $ref: "#/components/responses/Unauthorized"
                },
                "403": {
                    $ref: "#/components/responses/Forbidden"
                },
                "404": {
                    $ref: "#/components/responses/NotFound"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },
    "/accounts/account-number/{accountNumber}": {
        get: {
            tags: ["Account"],
            summary: "Get Account by Account Number",
            description: "Returns account details using the account number.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "accountNumber",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Account fetched successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AccountResponse"
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
                "404": {
                    $ref: "#/components/responses/NotFound"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    }
};
