import { AccountStatus, Prisma } from "@prisma/client";
import { CustomerDashboardResponseDto } from "../dtos/dashboard.dto";
import { CustomerRepository } from "../repositories/customer.repository";
import { DashboardRepository } from "../repositories/dashboard.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { RequestContext } from "../context/request-context";

export class DashboardService {
    private readonly dashboardRepository = new DashboardRepository();

    getCustomerDashboard = async (): Promise<CustomerDashboardResponseDto> => {
        const currentUser = RequestContext.getCurrentUser();

        if (!currentUser) {
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Unauthorized."
            );
        }

        const dashboard = await this.dashboardRepository.getCustomerDashboard(currentUser.userNumber);

        if (!dashboard) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );

        }

        const totalAccounts = dashboard.accounts.length;

        const activeAccounts = dashboard.accounts.filter(
            account => account.status === AccountStatus.ACTIVE
        ).length;

        const blockedAccounts = dashboard.accounts.filter(
            account => account.status === AccountStatus.BLOCKED
        ).length;

        const closedAccounts = dashboard.accounts.filter(
            account => account.status === AccountStatus.CLOSED
        ).length;

        const totalBalance = dashboard.accounts.reduce(
            (sum, account) => sum + Number(account.balance),
            0
        );

        const response : CustomerDashboardResponseDto = {

            customer: {
                customerNumber: dashboard.customer.customerNumber,
                name: dashboard.customer.user.name,
                email: dashboard.customer.user.email
            },

            accountSummary: {
                totalAccounts,
                activeAccounts,
                closedAccounts,
                blockedAccounts,
                totalBalance,
                currency: dashboard.accounts.length > 0
                    ? dashboard.accounts[0].currency
                    : "INR"
            },

            accounts:
                dashboard.accounts.map(account => ({
                    accountNumber: account.accountNumber,
                    accountType: account.accountType,
                    balance: Number(account.balance),
                    currency: account.currency,
                    status: account.status
                })),

            recentTransactions:
                dashboard.recentTransactions.map(transaction => ({
                    transactionReference: transaction.transactionReference,
                    accountNumber: transaction.accountNumber,
                    transactionType: transaction.transactionType,
                    amount: Number(transaction.amount),
                    status: transaction.status,
                    createdAt: transaction.createdAt
                })),

            notificationSummary: {
                unreadCount: dashboard.unreadNotificationCount,
                recentNotifications: dashboard.recentNotifications.map(notification => ({
                    notificationNumber: notification.notificationReference,
                    title: notification.title,
                    message: notification.message,
                    type: notification.type,
                    isRead: notification.isRead,
                    createdAt: notification.createdAt
                }))
            }
        };
        return response;
    }
}