import { z } from "zod";
import { accountNumberSchema } from "./common.validation";
import { TransactionChannel, TransactionMode, TransactionStatus, TransactionType } from "@prisma/client";

const amountSchema = z.coerce.number().positive("Amount must be greater than zero.");

export const depositSchema = z.object({
    body: z.object({
        accountNumber: accountNumberSchema,
        amount: amountSchema,
        transactionChannel: z.nativeEnum(TransactionChannel),
        remarks: z.string().trim().optional()
    })
});

export const withdrawSchema = z.object({
    body: z.object({
        accountNumber: accountNumberSchema,
        amount: amountSchema,
        transactionChannel: z.nativeEnum(TransactionChannel),
        remarks: z.string().trim().optional()
    })
});

export const fundTransferSchema = z.object({
    body: z.object({
        fromAccountNumber: accountNumberSchema,
        toAccountNumber: accountNumberSchema,
        amount: amountSchema,
        transactionChannel: z.nativeEnum(TransactionChannel),
        remarks: z.string().trim().optional()
    })
});

export const searchTransactionSchema = z.object({
    query: z.object({
        transactionReference: z.string().trim().optional(),
        accountNumber: accountNumberSchema.optional(),
        transactionType: z.nativeEnum(TransactionType).optional(),
        transactionMode: z.nativeEnum(TransactionMode).optional(),
        status: z.nativeEnum(TransactionStatus).optional()
    })
});
