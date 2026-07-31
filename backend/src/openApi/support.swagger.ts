import { OpenAPIV3 } from "openapi-types";

export const supportPaths: OpenAPIV3.PathsObject = {

    /**
     * ---------------------------------------------------------
     * POST /support
     * ---------------------------------------------------------
     */

    "/support": {

        post: {

            tags: [
                "Support"
            ],

            summary: "Create Support Ticket",

            description: "Creates a new support ticket for the authenticated customer.",

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
                            $ref: "#/components/schemas/CreateSupportRequest"
                        }

                    }

                }

            },

            responses: {

                "201": {

                    description: "Support ticket created successfully.",

                    content: {

                        "application/json": {

                            schema: {
                                $ref: "#/components/schemas/CreateSupportResponse"
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

        /**
         * ---------------------------------------------------------
         * GET /support
         * ---------------------------------------------------------
         */

        get: {

            tags: [
                "Support"
            ],

            summary: "Get My Support Tickets",

            description: "Retrieves all support tickets raised by the authenticated customer.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                "200": {

                    description: "Support tickets retrieved successfully.",

                    content: {

                        "application/json": {

                            schema: {
                                $ref: "#/components/schemas/SupportListResponse"
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

    /**
     * ---------------------------------------------------------
     * GET /support/{ticketNumber}
     * ---------------------------------------------------------
     */

    "/support/{ticketNumber}": {

        get: {

            tags: [
                "Support"
            ],

            summary: "Get Support Ticket Details",

            description: "Retrieves a support ticket by ticket number.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [

                {

                    name: "ticketNumber",

                    in: "path",

                    required: true,

                    description: "Unique support ticket number.",

                    schema: {

                        type: "string",

                        example: "SUP000001"

                    }

                }

            ],

            responses: {

                "200": {

                    description: "Support ticket retrieved successfully.",

                    content: {

                        "application/json": {

                            schema: {
                                $ref: "#/components/schemas/SupportDetailsResponse"
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