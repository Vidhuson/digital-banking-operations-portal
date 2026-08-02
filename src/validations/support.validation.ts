import { z } from "zod";
import {
    SupportCategory,
    SupportPriority
} from "@prisma/client";

/**
 * ---------------------------------------------------------------
 * Common Schemas
 * ---------------------------------------------------------------
 */

const subjectSchema = z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters.")
    .max(100, "Subject cannot exceed 100 characters.");

const descriptionSchema = z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(1000, "Description cannot exceed 1000 characters.");

const ticketNumberSchema = z
    .string()
    .trim()
    .regex(
        /^TKT\d{8}\d{8}$/,
        "Invalid support ticket number."
    );

/**
 * ---------------------------------------------------------------
 * Create Support Ticket
 * POST /support
 * ---------------------------------------------------------------
 */

export const createSupportSchema = z.object({

    body: z.object({

        subject: subjectSchema,

        description: descriptionSchema,

        category: z.nativeEnum(SupportCategory),

        priority: z.nativeEnum(SupportPriority)

    })

});

/**
 * ---------------------------------------------------------------
 * Get Ticket Details
 * GET /support/:ticketNumber
 * ---------------------------------------------------------------
 */

export const getSupportTicketSchema = z.object({

    params: z.object({

        ticketNumber: ticketNumberSchema

    })

});