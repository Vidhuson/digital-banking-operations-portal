/**
 * ----------------------------------------------------------------
 * Common Schemas variables
 * ----------------------------------------------------------------
 */

import { z } from "zod";

export const customerNumberSchema = z
    .string()
    .trim()
    .min(1, "Customer number is required.")
    .regex(/^CIF\d+$/, "Invalid customer number format.");

export const phoneNumberSchema = z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number.");

export const nameSchema = z
    .string()
    .trim()
    .min(2, "Must be at least 2 characters.")
    .max(50, "Cannot exceed 50 characters.");

export const addressSchema = z
    .string()
    .trim()
    .min(5, "Address is required.")
    .max(255, "Address cannot exceed 255 characters.");

export const emailSchema = z
    .string()
    .trim()
    .email("Invalid email address.");

export const dateSchema = z
    .string()
    .date("Invalid date format. Use YYYY-MM-DD.");