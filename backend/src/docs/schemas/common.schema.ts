export const commonSchemas = {
    ApiResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Operation completed successfully."
            },
            data: {
                type: "object",
                nullable: true
            }
        }
    },

    ErrorResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Validation failed."
            },
            data: {
                nullable: true,
                example: null
            }
        }
    }
};