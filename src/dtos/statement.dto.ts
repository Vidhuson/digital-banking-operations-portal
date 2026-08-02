import {
    AccountType,
    TransactionMode,
    TransactionStatus,
    TransactionType
} from "@prisma/client";

export interface StatementResponseDto {
    account: StatementAccountDto;
    summary: StatementSummaryDto;
    transactions: StatementTransactionDto[];
}

export interface StatementAccountDto {
    accountNumber: string;
    accountType: AccountType;
    branchName: string;
    balance: number;
    currency: string;
}

export interface StatementSummaryDto {
    openingBalance: number;
    closingBalance: number;
    totalCredits: number;
    totalDebits: number;
    transactionCount: number;
}

export interface StatementTransactionDto {
    transactionReference: string;
    transactionType: TransactionType;
    transactionMode: TransactionMode;
    amount: number;
    status: TransactionStatus;
    remarks: string | null;
    createdAt: Date;
}