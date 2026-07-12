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

}