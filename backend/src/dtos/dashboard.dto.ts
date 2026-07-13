import { Prisma, TransactionMode, TransactionType } from "@prisma/client";

export interface RecentTransactionDto {
    transactionReference: string;
    transactionType: TransactionType;
    transactionMode: TransactionMode;
    amount: Prisma.Decimal;
    createdAt: Date;
}

export interface CustomerInfoDto {
    customerId: string;
    fullName: string;
}

export interface CustomerDashboardResponseDto {
    customer: CustomerInfoDto;
    totalAccounts: number;
    totalBalance: Prisma.Decimal;
    recentTransactions: RecentTransactionDto[];
}

export interface AdminDashboardResponseDto {
    totalCustomers: number;
    totalAccounts: number;
    activeAccounts: number;
    inactiveAccounts: number;
    totalTransactions: number;
}