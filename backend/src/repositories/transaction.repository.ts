import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateTransactionRepositoryDto } from "../dtos/transaction.dto";

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

}