import { z } from "zod";

/**
 * ----------------------------------------------------------------
 * Common Schemas
 * ----------------------------------------------------------------
 */

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters.");

const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address.");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(20, "Password cannot exceed 20 characters.");

const phoneNumberSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Invalid phone number.");

const addressSchema = z
  .string()
  .trim();

const dateOfBirthSchema = z
  .string();

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
    dateOfBirth: dateOfBirthSchema.optional(),
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