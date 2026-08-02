import { z } from "zod";
import { addressSchema, dateSchema, emailSchema, nameSchema, phoneNumberSchema } from "./common.validation";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(20, "Password cannot exceed 20 characters.");


/**
 * ----------------------------------------------------------------
 * Register Customer
 * POST /auth/signup
 * ----------------------------------------------------------------
 */

export const signUpSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    phoneNumber: phoneNumberSchema.optional(),
    address: addressSchema.optional(),
    dateOfBirth: dateSchema.optional(),
  }),
});

/**
 * ----------------------------------------------------------------
 * Login
 * POST /auth/login
 * ----------------------------------------------------------------
 */

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required."),
  }),
});

/**
 * ----------------------------------------------------------------
 * change-password
 * POST /auth/change-password
 * ----------------------------------------------------------------
 */
export const changePasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(8),
        newPassword: z.string().min(8),
        confirmPassword: z.string().min(8)
    }).refine(
        data => data.newPassword === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"]
        }
    )
});