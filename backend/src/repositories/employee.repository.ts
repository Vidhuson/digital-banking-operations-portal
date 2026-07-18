import {prisma} from "../config/prisma";

export class EmployeeRepository {
    
    getEmployeeDashboard = async () => {
        // Start of today (00:00:00)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const [
            totalCustomers,
            totalAccounts,
            todayCustomers,
            todayAccounts,
            todayTransactions,
            todayTransactionAmount,
            recentCustomers,
            recentTransactions
        ] = await Promise.all([

            // Total Customers
            prisma.customer.count(),

            // Total Accounts
            prisma.account.count(),

            // Today's Customers
            prisma.customer.count({
                where: {
                    createdAt: {
                        gte: todayStart
                    }
                }
            }),

            // Today's Accounts
            prisma.account.count({
                where: {
                    createdAt: {
                        gte: todayStart
                    }
                }
            }),

            // Today's Transactions
            prisma.transaction.count({
                where: {
                    createdAt: {
                        gte: todayStart
                    }
                }
            }),

            // Today's Transaction Amount
            prisma.transaction.aggregate({
                _sum: {
                    amount: true
                },
                where: {
                    createdAt: {
                        gte: todayStart
                    }
                }
            }),

            // Recent Customers
            prisma.customer.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                take: 5,
                select: {
                    customerNumber: true,
                    fullName: true,
                    email: true,
                    mobileNumber: true,
                    createdAt: true
                }
            }),

            // Recent Transactions
            prisma.transaction.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                take: 5,
                select: {
                    transactionReference: true,
                    accountNumber: true,
                    transactionType: true,
                    transactionMode: true,
                    amount: true,
                    status: true,
                    createdAt: true
                }
            })

        ]);

        return {
            summary: {
                totalCustomers,
                totalAccounts,
                todayCustomers,
                todayAccounts,
                todayTransactions,
                todayTransactionAmount:
                    todayTransactionAmount._sum.amount ?? 0
            },
            recentCustomers,
            recentTransactions
        };
    }
}