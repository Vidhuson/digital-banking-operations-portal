import { OpenAPIV3 } from "openapi-types";

export const customerSchemas: Record<string, OpenAPIV3.SchemaObject> = {
    Customer: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "d541129c-7fe9-47cc-9d49-7dddaf4b05cc"
            },
            customerNumber: {
                type: "string",
                example: "CIF606597939"
            },
            userId: {
                type: "string",
                format: "uuid",
                example: "cb1f0b2a-bb34-4e28-bf6c-449cf5538c2a"
            },
            phoneNumber: {
                type: "string",
                nullable: true,
                example: "9876543210"
            },
            address: {
                type: "string",
                nullable: true,
                example: "Chennai"
            },
            dateOfBirth: {
                type: "string",
                format: "date-time",
                nullable: true,
                example: "2000-01-01T00:00:00.000Z"
            },
            status: {
                type: "string",
                enum: [
                    "PENDING_APPROVAL",
                    "ACTIVE",
                    "INACTIVE"
                ],
                example: "ACTIVE"
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-07-19T20:39:10.184Z"
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                example: "2026-07-20T12:47:30.466Z"
            }
        }
    },

        CustomerUser: {
        type: "object",
        properties: {
            userNumber: {
                type: "string",
                example: "USR100001"
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
                enum: [
                    "CUSTOMER",
                    "EMPLOYEE",
                    "ADMIN"
                ],
                example: "CUSTOMER"
            },
            status: {
                type: "string",
                enum: [
                    "ACTIVE",
                    "INACTIVE"
                ],
                example: "ACTIVE"
            }
        }
    },


    CustomerWithUser: {
        allOf: [
            {
                $ref: "#/components/schemas/Customer"
            },
            {
                type: "object",
                properties: {
                    user: {
                        $ref: "#/components/schemas/CustomerUser"
                    }
                }
            }
        ]
    },

    CreateCustomerRequest: {
        type: "object",
        required: [
            "name",
            "email",
            "password"
        ],
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
                example: "John@123"
            },
            phoneNumber: {
                type: "string",
                nullable: true,
                example: "9876543210"
            },
            address: {
                type: "string",
                nullable: true,
                example: "Chennai"
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                nullable: true,
                example: "2000-01-01"
            }
        }
    },

    UpdateCustomerRequest: {
        type: "object",
        properties: {
            phoneNumber: {
                type: "string",
                nullable: true,
                example: "9876543210"
            },
            address: {
                type: "string",
                nullable: true,
                example: "Chennai"
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                nullable: true,
                example: "2000-01-01"
            }
        }
    },

    CustomerResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Customer fetched successfully"
            },
            data: {
                $ref: "#/components/schemas/CustomerWithUser"
            }
        }
    },

    CreateCustomerResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Customer created successfully."
            },
            data: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "3d6d1d42-0c0e-4c97-9c18-f5d5aef67d55"
                    },
                    userNumber: {
                        type: "string",
                        example: "USR000001"
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
                        example: "john@example.com"
                    },
                    role: {
                        type: "string",
                        example: "CUSTOMER"
                    },
                    status: {
                        type: "string",
                        example: "ACTIVE"
                    },
                    isFirstLogin: {
                        type: "boolean",
                        example: true
                    }
                }
            }
        }
    },

    CustomerListResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Customers fetched successfully"
            },
            data: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/CustomerWithUser"
                }
            }
        }
    },

    CustomerStatusResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Customer approved successfully"
            },
            data: {
                type: "object",
                properties: {
                    customerNumber: {
                        type: "string",
                        example: "CIF606597939"
                    },
                    status: {
                        type: "string",
                        enum: [
                            "ACTIVE",
                            "INACTIVE"
                        ],
                        example: "ACTIVE"
                    }
                }
            }
        }
    }
};