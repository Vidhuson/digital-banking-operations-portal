import { OpenAPIV3 } from "openapi-types";

export const customerPaths: OpenAPIV3.PathsObject = {
    "/customers": {
        post: {
            tags: ["Customers"],
            summary: "Create Customer",
            description: "Creates a new customer.",
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
                            $ref: "#/components/schemas/CreateCustomerRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Customer created successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateCustomerResponse"
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
                "409": {
                    $ref: "#/components/responses/Conflict"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        },

        get: {
            tags: ["Customers"],
            summary: "Get All Customers",
            description: "Returns all registered customers.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                "200": {
                    description: "Customers fetched successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerListResponse"
                            }
                        }
                    }
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

    "/customers/pending": {
        get: {
            tags: ["Customers"],
            summary: "Get Pending Customers",
            description: "Returns all customers awaiting approval.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            responses: {
                "200": {
                    description: "Pending customers fetched successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerListResponse"
                            }
                        }
                    }
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

    "/customers/{customerNumber}": {
        get: {
            tags: ["Customers"],
            summary: "Get Customer",
            description: "Returns customer details using customer number.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    $ref: "#/components/parameters/CustomerNumber"
                }
            ],
            responses: {
                "200": {
                    description: "Customer fetched successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerResponse"
                            }
                        }
                    }
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
        },

        put: {
            tags: ["Customers"],
            summary: "Update Customer",
            description: "Updates an existing customer's details.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    $ref: "#/components/parameters/CustomerNumber"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UpdateCustomerRequest"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Customer updated successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerResponse"
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
        },

        delete: {
            tags: ["Customers"],
            summary: "Delete Customer",
            description: "Deletes a customer.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    $ref: "#/components/parameters/CustomerNumber"
                }
            ],
            responses: {
                "200": {
                    description: "Customer deleted successfully."
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
    },

    "/customers/{customerNumber}/approve": {
        patch: {
            tags: ["Customers"],
            summary: "Approve Customer",
            description: "Approves a pending customer.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    $ref: "#/components/parameters/CustomerNumber"
                }
            ],
            responses: {
                "200": {
                    description: "Customer approved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerStatusResponse"
                            }
                        }
                    }
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
                "409": {
                    $ref: "#/components/responses/Conflict"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    },

    "/customers/{customerNumber}/reject": {
        patch: {
            tags: ["Customers"],
            summary: "Reject Customer",
            description: "Rejects a pending customer.",
            security: [
                {
                    BearerAuth: []
                }
            ],
            parameters: [
                {
                    $ref: "#/components/parameters/CustomerNumber"
                }
            ],
            responses: {
                "200": {
                    description: "Customer rejected successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CustomerStatusResponse"
                            }
                        }
                    }
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
                "409": {
                    $ref: "#/components/responses/Conflict"
                },
                "500": {
                    $ref: "#/components/responses/InternalServerError"
                }
            }
        }
    }
};