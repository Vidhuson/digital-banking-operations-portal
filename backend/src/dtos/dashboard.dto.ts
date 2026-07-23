import {
    AccountStatus,
    AccountType,
    TransactionStatus,
    TransactionType,
    NotificationType
} from "@prisma/client";

export interface CustomerDashboardResponseDto {
    customer: CustomerInfoDto;
    accountSummary: DashboardSummaryDto;
    accounts: DashboardAccountDto[];
    recentTransactions: DashboardTransactionDto[];
    notificationSummary: NotificationSummaryDto;
}

export interface CustomerInfoDto {
    customerNumber: string;
    name: string;
    email: string;
}
export interface DashboardSummaryDto {
    totalAccounts: number;
    activeAccounts: number;
    blockedAccounts: number;
    closedAccounts: number;
    totalBalance: number;
    currency: string;
}
export interface DashboardAccountDto {
    accountNumber: string;
    accountType: AccountType;
    balance: number;
    currency: string;
    status: AccountStatus;
}
export interface DashboardTransactionDto {
    transactionReference: string;
    accountNumber: string;
    transactionType: TransactionType;
    amount: number;
    status: TransactionStatus;
    createdAt: Date;
}
export interface NotificationSummaryDto {
    unreadCount: number;
    recentNotifications: DashboardNotificationDto[];
}
export interface DashboardNotificationDto {
    notificationNumber: string;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: Date;
}