import { prisma } from "../config/prisma";
import { CreateTransactionRepositoryDto } from "../dtos/transaction.dto";

export class TransactionRepository {
    createTransaction = async (transactionData: CreateTransactionRepositoryDto) => {
        return prisma.transaction.create({
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