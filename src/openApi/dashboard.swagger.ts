import { OpenAPIV3 } from "openapi-types";

export const dashboardPaths: OpenAPIV3.PathsObject = {
    "/dashboard/customer": {
        get: {
            tags: ["Dashboard"],

            summary: "Get Customer Dashboard",

            description:
                "Retrieves the authenticated customer's dashboard information.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {
                "200": {
                    description: "Customer dashboard retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerDashboardResponse"
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