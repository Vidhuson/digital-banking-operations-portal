import { AccountStatus } from "@prisma/client";
import { prisma } from "../config/prisma";

export class DashboardRepository {

    getAccountSummary = async (customerId: string) => {
        return prisma.account.aggregate({
            where: { customerId },
            _count: { id: true },
            _sum: { balance: true }
        });
    };

    getRecentTransactions = async (customerId: string) => {
        return prisma.transaction.findMany({
            where: {
                account: { customerId }
            },
            orderBy: { createdAt: "desc" },
            take: 5
        });
    };

    getAdminDashboardSummary = async () => {
        const totalCustomers = await prisma.customer.count();
        const totalAccounts = await prisma.account.count();
        const activeAccounts = await prisma.account.count({
            where: { status: AccountStatus.ACTIVE }
        });

        const inactiveAccounts = await prisma.account.count({
            where: { status: AccountStatus.CLOSED }
        });

        const totalTransactions = await prisma.transaction.count();

        return {
            totalCustomers,
            totalAccounts,
            activeAccounts,
            inactiveAccounts,
            totalTransactions
        };
    };

}