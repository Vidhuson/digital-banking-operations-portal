import { AccountStatus } from "@prisma/client";
import { prisma } from "../config/prisma";

export class DashboardRepository {

    getCustomerDashboard = async (userNumber: string) => {

        //Get customer
        const customer = await prisma.customer.findFirst({
            where: {
                user: {
                    userNumber
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        userNumber: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (!customer) {
            return null;
        }

        //Accounts
        const accounts = await prisma.account.findMany({
            where: {
                customerId: customer.id
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        //Recent Transactions
        const recentTransactions = await prisma.transaction.findMany({
            where: {
                account: {
                    customerId: customer.id
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 5
        });

        //Unread Notification Count
        const unreadNotificationCount = await prisma.notification.count({
                where: {
                    userNumber,
                    isRead: false
                }
            });
        
        //Recent Notifications 
        const recentNotifications = await prisma.notification.findMany({
                where: {
                    userNumber,
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 3
            });

        return {
            customer,
            accounts,
            recentTransactions,
            unreadNotificationCount,
            recentNotifications
        };
    };
}