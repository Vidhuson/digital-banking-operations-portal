import { OpenAPIV3 } from "openapi-types";

export const supportSchemas: Record<string, OpenAPIV3.SchemaObject> = {

    SupportTicket: {

        type: "object",

        properties: {

            ticketNumber: {
                type: "string",
                example: "SUP000001"
            },

            subject: {
                type: "string",
                example: "Unable to transfer money"
            },

            description: {
                type: "string",
                example: "Fund transfer failed twice."
            },

            category: {
                type: "string",
                enum: [
                    "ACCOUNT",
                    "TRANSACTION",
                    "TECHNICAL",
                    "OTHER"
                ],
                example: "TRANSACTION"
            },

            priority: {
                type: "string",
                enum: [
                    "LOW",
                    "MEDIUM",
                    "HIGH"
                ],
                example: "HIGH"
            },

            status: {
                type: "string",
                enum: [
                    "OPEN",
                    "IN_PROGRESS",
                    "RESOLVED",
                    "CLOSED"
                ],
                example: "OPEN"
            },

            createdAt: {
                type: "string",
                format: "date-time"
            },

            updatedAt: {
                type: "string",
                format: "date-time"
            }

        }

    },

    CreateSupportRequest: {

        type: "object",

        required: [
            "subject",
            "description",
            "category",
            "priority"
        ],

        properties: {

            subject: {
                type: "string",
                example: "Unable to transfer money"
            },

            description: {
                type: "string",
                example: "Fund transfer failed twice while sending money."
            },

            category: {
                type: "string",
                enum: [
                    "ACCOUNT",
                    "TRANSACTION",
                    "TECHNICAL",
                    "OTHER"
                ]
            },

            priority: {
                type: "string",
                enum: [
                    "LOW",
                    "MEDIUM",
                    "HIGH"
                ]
            }

        }

    },

    CreateSupportResponse: {

        type: "object",

        properties: {

            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Support ticket created successfully."
            },

            data: {

                type: "object",

                properties: {

                    ticketNumber: {
                        type: "string",
                        example: "TKT2026073180380026"
                    }

                }

            }

        }

    },

    SupportListResponse: {

        type: "object",

        properties: {

            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Support tickets retrieved successfully."
            },

            data: {

                type: "array",

                items: {

                    type: "object",

                    properties: {

                        ticketNumber: {
                            type: "string"
                        },

                        subject: {
                            type: "string"
                        },

                        category: {
                            type: "string"
                        },

                        priority: {
                            type: "string"
                        },

                        status: {
                            type: "string"
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                }

            }

        }

    },

    SupportDetailsResponse: {

        type: "object",

        properties: {

            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Support ticket retrieved successfully."
            },

            data: {

                $ref: "#/components/schemas/SupportTicket"

            }

        }

    }

};