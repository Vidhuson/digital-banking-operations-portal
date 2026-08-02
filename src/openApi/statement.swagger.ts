import { OpenAPIV3 } from "openapi-types";

export const statementPaths: OpenAPIV3.PathsObject = {
    "/statements": {
        get: {
            tags: [
                "Statement"
            ],
            summary: "Get Account Statement",
            description: "Retrieve account statement for a specified date range.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "accountNumber",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        example: "4012123412341234"
                    }
                },
                {
                    name: "fromDate",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        format: "date",
                        example: "2026-07-01"
                    }
                },
                {
                    name: "toDate",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string",
                        format: "date",
                        example: "2026-07-31"
                    }
                },
                {
                    name: "page",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        default: 1
                    }
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        default: 10
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Statement retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/StatementResponse"
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
        }
    }
};