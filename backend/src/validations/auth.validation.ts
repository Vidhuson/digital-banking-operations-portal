import { z } from "zod";

export const signUpSchema = z.object({
    body: z.object({
        name: z.string().trim().min(3, "Name must be at least 3 characters."),

        email: z.email("Invalid email address."),

        password: z.string()
        .min(8, "Password must be at least 8 characters.")
        .max(20, "Password cannot exceed 20 characters."),

        phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number."),

        address: z.string().optional(),

        dateOfBirth: z.string().optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.email("Invalid email address."),
        password: z.string().min(1, "Password is required."),
    }),
});