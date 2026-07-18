import { z } from "zod";

export const customerNumberParamSchema = z.object({
    params: z.object({
        customerNumber: z.string().min(1, "Customer number is required.")
    })
});

export const updateCustomerSchema = z.object({
    params: z.object({
        customerNumber: z.string().min(1, "Customer number is required.")
    }),

    body: z.object({
        phoneNumber: z.string()
            .regex(/^[6-9]\d{9}$/, "Invalid phone number.")
            .optional(),

        address: z.string().optional(),

        dateOfBirth: z.string().optional(),

        status: z.enum(["ACTIVE", "INACTIVE", "PENDING_APPROVAL"]).optional()
    })
});