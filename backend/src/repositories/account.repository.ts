import { AccountStatus, AccountType, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { CreateAccountRepositoryDto, UpdateAccountRepositoryDto } from "../dtos/account.dto";

export class AccountRepository {

    createAccount = async (accountData: CreateAccountRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.account.create({
            data: accountData
        })
    }

    getAccounts = async () => {
        return prisma.account.findMany({
            include: { customer: true }
        });
    };

    getAccountById = async (id: string) => {
        return prisma.account.findUnique({
            where: { id },
            include: { customer: true }
        });
    };

    getAccountByAccountNumber = async (accountNumber: string) => {
        return prisma.account.findUnique({
            where: { accountNumber }
        });
    };

    deleteAccount = async (id: string , tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.account.delete({
            where: { id }
        });
    };

    updateAccount = async (id: string, updateData: UpdateAccountRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.account.update({
            where: { id },
            data: updateData
        });
    };
}