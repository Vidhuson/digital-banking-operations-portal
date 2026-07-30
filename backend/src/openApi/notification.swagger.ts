import { OpenAPIV3 } from "openapi-types";

export const notificationPaths: OpenAPIV3.PathsObject = {

    "/notifications": {

        get: {

            tags: [
                "Notifications"
            ],

            summary: "Get Notifications",

            description:
                "Retrieves all notifications for the authenticated user.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                "200": {
                    description: "Notifications retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NotificationListResponse"
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

    "/notifications/unread": {

        get: {

            tags: [
                "Notifications"
            ],

            summary: "Get Unread Notifications",

            description:
                "Retrieves all unread notifications for the authenticated user.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                "200": {
                    description: "Unread notifications retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NotificationListResponse"
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

    "/notifications/read-all": {

        patch: {

            tags: [
                "Notifications"
            ],

            summary: "Mark All Notifications As Read",

            description:
                "Marks all unread notifications as read for the authenticated user.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            responses: {

                "200": {
                    description: "All notifications marked as read successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NotificationReadAllResponse"
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

    "/notifications/{notificationReference}/read": {

        patch: {

            tags: [
                "Notifications"
            ],

            summary: "Mark Notification As Read",

            description:
                "Marks a notification as read using the notification reference.",

            security: [
                {
                    BearerAuth: []
                }
            ],

            parameters: [
                {
                    name: "notificationReference",
                    in: "path",
                    required: true,
                    description: "Unique notification reference",
                    schema: {
                        type: "string",
                        example: "NOT100001"
                    }
                }
            ],

            responses: {

                "200": {
                    description: "Notification marked as read successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NotificationReadResponse"
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