import { OpenAPIV3 } from "openapi-types";

export const profilePaths: OpenAPIV3.PathsObject = {

    "/profile": {

        /**
         * -----------------------------------------
         * GET /profile
         * -----------------------------------------
         */
        get: {

            tags: ["Profile"],

            summary: "Get logged-in customer profile",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                200: {
                    description: "Profile retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProfileResponse"
                            }
                        }
                    }
                },

                401: {
                    $ref: "#/components/responses/Unauthorized"
                },

                403: {
                    $ref: "#/components/responses/Forbidden"
                },

                404: {
                    $ref: "#/components/responses/NotFound"
                },

                500: {
                    $ref: "#/components/responses/InternalServerError"
                }

            }

        },

        /**
         * -----------------------------------------
         * PUT /profile
         * -----------------------------------------
         */
        put: {

            tags: ["Profile"],

            summary: "Update logged-in customer profile",

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
                            $ref: "#/components/schemas/UpdateProfileRequest"
                        }

                    }

                }

            },

            responses: {

                200: {
                    description: "Profile updated successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateProfileResponse"
                            }
                        }
                    }
                },

                400: {
                    $ref: "#/components/responses/BadRequest"
                },

                401: {
                    $ref: "#/components/responses/Unauthorized"
                },

                403: {
                    $ref: "#/components/responses/Forbidden"
                },

                404: {
                    $ref: "#/components/responses/NotFound"
                },

                500: {
                    $ref: "#/components/responses/InternalServerError"
                }

            }

        }

    }

};