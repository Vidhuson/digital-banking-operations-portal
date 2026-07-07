
import { AccountStatus, AccountType, Prisma } from "@prisma/client";


/**
 * Controller -> Service ie..,
 */
export interface CreateAccountDto {
    customerId: string;
    accountType: AccountType;
}

export interface UpdateAccountDto {
    accountType?: AccountType;
    status?: AccountStatus;
    currency?: string;
}

/**
 * Service -> Repository
 */
export interface CreateAccountRepositoryDto {
    accountNumber: string;
    customerId: string;
    branchName: string;
    ifscCode: string;
    accountType: AccountType;
    balance: Prisma.Decimal;
    currency: string;
}

export interface UpdateAccountRepositoryDto {
    accountType?: AccountType;
    status?: AccountStatus;
    currency?: string;
    balance?: Prisma.Decimal;
}