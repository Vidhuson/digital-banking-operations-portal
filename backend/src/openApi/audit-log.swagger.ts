import { OpenAPIV3 } from "openapi-types";

export const auditLogPaths: OpenAPIV3.PathsObject = {
    "/audit-logs": {
        get: {
            tags: ["AuditLog"],
            summary: "Search Audit Logs",
            description: "Searches audit logs based on optional filters.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    name: "auditReference",
                    in: "query",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "userNumber",
                    in: "query",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "module",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["AUTH", "CUSTOMER", "ACCOUNT", "TRANSACTION", "DASHBOARD"]
                    }
                },
                {
                    name: "status",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["SUCCESS", "FAILURE"]
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Audit logs retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AuditLogListResponse"
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
