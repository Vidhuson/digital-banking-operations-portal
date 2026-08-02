import { OpenAPIV3 } from "openapi-types";

export const employeePaths: OpenAPIV3.PathsObject = {
    "/employees/dashboard": {
        get: {
            tags: ["Employee"],
            summary: "Get Employee Dashboard",
            description: "Retrieves employee dashboard metrics and recent activity.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                "200": {
                    description: "Employee dashboard retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/EmployeeDashboardResponse"
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
