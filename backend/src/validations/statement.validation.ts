import { z } from "zod";

/**
 * ----------------------------------------------------------------
 * Common Schemas
 * ----------------------------------------------------------------
 */

const accountNumberSchema = z
    .string()
    .trim()
    .regex(/^\d{16}$/, "Invalid account number.");

const dateSchema = z
    .string()
    .date("Invalid date format. Use YYYY-MM-DD.");

const pageSchema = z
    .coerce
    .number()
    .min(1);

const limitSchema = z
    .coerce
    .number()
    .min(1)
    .max(100);
/**
 * ----------------------------------------------------------------
 * Get Statement
 * GET /statements
 * ----------------------------------------------------------------
 */

export const getStatementSchema = z.object({
    query: z.object({
        accountNumber: accountNumberSchema,
        fromDate: dateSchema,
        toDate: dateSchema,
        page: pageSchema.optional(),
        limit: limitSchema.optional()
    })
});