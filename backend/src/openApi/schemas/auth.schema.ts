import { OpenAPIV3 } from "openapi-types";

export const authSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    SignupRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: {
                type: "string",
                example: "John Doe"
            },
            email: {
                type: "string",
                format: "email",
                example: "john@example.com"
            },
            password: {
                type: "string",
                format: "password",
                example: "Password@123"
            },
            phoneNumber: {
                type: "string",
                example: "9876543210"
            },
            address: {
                type: "string",
                example: "Chennai"
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                example: "2000-01-01"
            }
        }
    },

    LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
                format: "email",
                example: "john@example.com"
            },
            password: {
                type: "string",
                format: "password",
                example: "Password@123"
            }
        }
    },

    UserData: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            userNumber: {
                type: "string",
                example: "USR91965597"
            },
            name: {
                type: "string",
                example: "John Doe"
            },
            email: {
                type: "string",
                format: "email",
                example: "john@example.com"
            },
            role: {
                type: "string",
                enum: ["ADMIN", "EMPLOYEE", "CUSTOMER"]
            },
            status: {
                type: "string",
                enum: ["ACTIVE", "INACTIVE", "PENDING_APPROVAL"]
            },
            isFirstLogin: {
                type: "boolean",
                example: true
            }
        }
    },

    signedUpData: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            userNumber: {
                type: "string",
                example: "USR91965597"
            },
            customerNumber: {
                type: "string",
                example: "CUST000001"
            },
            name: {
                type: "string",
                example: "John Doe"
            },
            email: {
                type: "string",
                format: "email",
                example: "john@example.com"
            },
            role: {
                type: "string",
                enum: ["ADMIN", "EMPLOYEE", "CUSTOMER"]
            },
            status: {
                type: "string",
                enum: ["ACTIVE", "INACTIVE", "PENDING_APPROVAL"]
            },
            isFirstLogin: {
                type: "boolean",
                example: true
            }
        }
    },

    SignupResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "User registered successfully."
            },
            data: {
                $ref: "#/components/schemas/signedUpData"
            }
        }
    },

    LoginData: {
        type: "object",
        properties: {
            jwtToken: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            },
            user: {
                $ref: "#/components/schemas/UserData"
            }
        }
    },

    LoginResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Login successful."
            },
            data: {
                $ref: "#/components/schemas/LoginData"
            }
        }
    },

    ChangePasswordRequest: {
        type: "object",
        required: [
            "currentPassword",
            "newPassword",
            "confirmPassword"
        ],
        properties: {
            currentPassword: {
                type: "string",
                example: "Temp@123"
            },
            newPassword: {
                type: "string",
                example: "NewPassword@123"
            },
            confirmPassword: {
                type: "string",
                example: "NewPassword@123"
            }
        }
    },

    ChangePasswordResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Password changed successfully."
            }
        }
    },
};