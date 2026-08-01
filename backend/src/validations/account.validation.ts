import { z } from "zod";
import { accountNumberSchema, customerNumberSchema, idSchema } from "./common.validation";
import { AccountStatus, AccountType } from "@prisma/client";

export const createAccountSchema = z.object({
    body: z.object({
        customerNumber: customerNumberSchema,
        accountType: z.nativeEnum(AccountType)
    })
});

export const updateAccountSchema = z.object({
    body: z.object({
        accountType: z.nativeEnum(AccountType).optional(),
        status: z.nativeEnum(AccountStatus).optional(),
        currency: z.string().trim().optional()
    })
});

export const accountIdParamSchema = z.object({
    params: z.object({
        id: idSchema
    })
});

export const accountNumberParamSchema = z.object({
    params: z.object({
        accountNumber: accountNumberSchema
    })
});
