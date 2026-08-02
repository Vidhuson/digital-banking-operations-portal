import { OpenAPIV3 } from "openapi-types";
export const profileSchemas: Record<string, OpenAPIV3.SchemaObject>= {

    Profile: {
        type: "object",
        properties: {
            customerNumber: {
                type: "string",
                example: "CUST000001"
            },
            userNumber: {
                type: "string",
                example: "USR000001"
            },
            name: {
                type: "string",
                example: "John Doe"
            },
            email: {
                type: "string",
                example: "john.doe@example.com"
            },
            phoneNumber: {
                type: "string",
                example: "9876543210"
            },
            address: {
                type: "string",
                example: "Chennai, Tamil Nadu"
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                example: "2000-01-01"
            },
            status: {
                type: "string",
                example: "ACTIVE"
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-07-31T10:30:00.000Z"
            }
        }
    },

    UpdateProfileRequest: {
        type: "object",
        properties: {
            phoneNumber: {
                type: "string",
                example: "9876543210"
            },
            address: {
                type: "string",
                example: "Chennai, Tamil Nadu"
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                example: "2000-01-01"
            }
        }
    },

    ProfileResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Profile retrieved successfully."
            },
            data: {
                $ref: "#/components/schemas/Profile"
            }
        }
    },

    UpdateProfileResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Profile updated successfully."
            }
        }
    }
};