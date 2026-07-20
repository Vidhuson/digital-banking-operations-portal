import { OpenAPIV3 } from "openapi-types";

export const authPaths: OpenAPIV3.PathsObject = {
    "/auth/signup": {
        post: {
            tags: ["Authentication"],
            summary: "Register Customer",
            description:
                "Registers a new customer account. Newly registered customers remain in PENDING_APPROVAL status until approved by an employee or administrator.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SignupRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Customer registered successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/SignupResponse"
                            }
                        }
                    }
                },
                "400": {
                    $ref: "#/components/responses/BadRequest"
                },
                "409": {
                    $ref: "#/components/responses/Conflict"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },

    "/auth/login": {
        post: {
            tags: ["Authentication"],
            summary: "Login",
            description:
                "Authenticates a user using email and password and returns a JWT access token.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/LoginRequest"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Login successful.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/LoginResponse"
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
    }
};