import { CustomerStatus } from "@prisma/client";
import { z } from "zod";
import { addressSchema, customerNumberSchema, dateSchema, emailSchema, nameSchema, phoneNumberSchema } from "./common.validation";

/**
 * ----------------------------------------------------------------
 * Create Customer
 * POST /customers
 * ----------------------------------------------------------------
 */

export const createCustomerSchema = z.object({
    body: z.object({
        name : nameSchema,

        email: emailSchema,

        phoneNumber: phoneNumberSchema.optional(),

        address: addressSchema.optional(),

        dateOfBirth: dateSchema.optional(),

        temporaryPassword: z.string().optional(),
    })
});

/**
 * ----------------------------------------------------------------
 * Update Customer
 * PUT /customers/:customerNumber
 * ----------------------------------------------------------------
 */

export const updateCustomerSchema = z.object({
    params: z.object({
        customerNumber: customerNumberSchema
    }),

    body: z.object({
        name : nameSchema.optional(),

        phoneNumber: phoneNumberSchema.optional(),

        address: addressSchema.optional(),

        dateOfBirth: dateSchema.optional(),

        status: z.nativeEnum(CustomerStatus).optional()
    })
});

/**
 * ----------------------------------------------------------------
 * Customer Number Param
 *
 * Used by
 * GET    /:customerNumber
 * DELETE /:customerNumber
 * PATCH  /:customerNumber/approve
 * PATCH  /:customerNumber/reject
 * ----------------------------------------------------------------
 */

export const customerNumberParamSchema = z.object({
    params: z.object({
        customerNumber: customerNumberSchema
    })
});