import { CustomerStatus } from "@prisma/client";
import { z } from "zod";

/**
 * ----------------------------------------------------------------
 * Common Schemas
 * ----------------------------------------------------------------
 */

const customerNumberSchema = z
    .string()
    .trim()
    .min(1, "Customer number is required.")
    .regex(/^CIF\d+$/, "Invalid customer number format.");

const phoneNumberSchema = z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number.");

const nameSchema = z
    .string()
    .trim()
    .min(2, "Must be at least 2 characters.")
    .max(50, "Cannot exceed 50 characters.");

const addressSchema = z
    .string()
    .trim()
    .min(5, "Address is required.")
    .max(255, "Address cannot exceed 255 characters.");

const emailSchema = z
    .string()
    .trim()
    .email("Invalid email address.");

const dateSchema = z
    .string()
    .date("Invalid date format. Use YYYY-MM-DD.");

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