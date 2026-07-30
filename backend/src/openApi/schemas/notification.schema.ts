import { OpenAPIV3 } from "openapi-types";

export const notificationSchemas: Record<string, OpenAPIV3.SchemaObject> = {

    Notification: {
        type: "object",
        properties: {
            notificationReference: {
                type: "string",
                example: "NOT100001"
            },
            title: {
                type: "string",
                example: "Salary Credited"
            },
            message: {
                type: "string",
                example: "₹80,000 credited successfully."
            },
            type: {
                type: "string",
                enum: [
                    "SUCCESS",
                    "INFO",
                    "WARNING",
                    "ERROR"
                ],
                example: "SUCCESS"
            },
            isRead: {
                type: "boolean",
                example: false
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-07-30T10:15:00.000Z"
            }
        }
    },

    NotificationListResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Notifications retrieved successfully."
            },
            data: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/Notification"
                }
            }
        }
    },

    NotificationReadResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Notification marked as read successfully."
            },
            data: {
                type: "object",
                nullable: true,
                example: null
            }
        }
    },

    NotificationReadAllResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "All notifications marked as read successfully."
            },
            data: {
                type: "object",
                nullable: true,
                example: null
            }
        }
    }
};