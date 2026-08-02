import { z } from "zod";
import { addressSchema, dateSchema, phoneNumberSchema } from "./common.validation";
/**
 * ----------------------------------------------------------------
 * Update Profile
 * PUT /profile
 * ----------------------------------------------------------------
 */
export const updateProfileSchema = z.object({
    body: z.object({
        phoneNumber: phoneNumberSchema.optional(),
        address: addressSchema.optional(),
        dateOfBirth: dateSchema.optional()
    })
});