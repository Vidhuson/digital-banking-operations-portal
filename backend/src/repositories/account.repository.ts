import { AccountStatus, AccountType } from '@prisma/client';
import { prisma } from '../config/prisma';
import { UpdateAccountDto } from "../dtos/account.dto";

export class AccountRepository {

    createAccount = async (accountData: {
        accountNumber: string;
        customerId: string;
        accountType: AccountType;
        balance: number;
        currency: string;
        status: AccountStatus;
    }) => {
        return prisma.account.create({
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

    deleteAccount = async (id: string) => {
        return prisma.account.delete({
            where: { id }
        });
    };

    updateAccount = async (id: string, updateData: UpdateAccountDto) => {
        return prisma.account.update({
            where: { id },
            data: updateData
        });
    };
}