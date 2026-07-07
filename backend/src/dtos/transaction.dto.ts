import { Prisma, TransactionChannel, TransactionMode, TransactionStatus, TransactionType } from "@prisma/client";

/**
 * Controller -> Service
 */
export interface DepositDto {
    accountNumber: string;
    amount: number;
    transactionChannel: TransactionChannel;
    remarks?: string;

}

export interface WithdrawDto {
    accountNumber: string;
    amount: number;
    transactionChannel: TransactionChannel;
    remarks?: string;
}

export interface FundTransferDto {
    fromAccountNumber: string;
    toAccountNumber: string;
    amount: number;
    transactionChannel: TransactionChannel;
    remarks?: string;
}

/**
 * Service -> Repository
 */
export interface CreateTransactionRepositoryDto {
    transactionReference: string;
    accountId: string;
    accountNumber: string;
    counterpartyAccountNumber?: string;
    transactionType: TransactionType;
    transactionMode: TransactionMode;
    transactionChannel: TransactionChannel;
    amount: Prisma.Decimal;
    openingBalance: Prisma.Decimal;
    closingBalance: Prisma.Decimal;
    status: TransactionStatus;
    remarks?: string;
    sourceReference?: string;
}