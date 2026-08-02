import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateTransactionRepositoryDto, SearchTransactionDto } from "../dtos/transaction.dto";

export class TransactionRepository {
    createTransaction = async (transactionData: CreateTransactionRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.transaction.create({
            data: transactionData
        });
    };

    getTransactionByReference = async (transactionReference: string) => {
        return prisma.transaction.findMany({
            where: { transactionReference }
        });
    };

    getTransactionsByAccountNumber = async (accountNumber: string) => {
        return prisma.transaction.findMany({
            where: { accountNumber },
            orderBy: { createdAt: "desc" }
        });
    };

    searchTransactions = async (filters: SearchTransactionDto) => {
        return prisma.transaction.findMany({
            where: {

                ...(filters.transactionReference && { transactionReference: filters.transactionReference }),
                ...(filters.accountNumber && { accountNumber: filters.accountNumber }),
                ...(filters.transactionType && { transactionType: filters.transactionType }),
                ...(filters.transactionMode && { transactionMode: filters.transactionMode}),
                ...(filters.status && {status: filters.status})
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    };
}