import { Prisma } from "@prisma/client";
import { CreateNotificationDto } from "../dtos/notification.dto";
import { prisma } from "../config/prisma";

export class NotificationRepository {

    createNotification = async (data: CreateNotificationDto, tx?: Prisma.TransactionClient) => {
        const prismaClient = tx ?? prisma;
        return await prismaClient.notification.create({
            data
        });
    };

    getNotifications = async (userNumber: string) => {
        return await prisma.notification.findMany({
            where: {
                userNumber
            },
            orderBy: {
                createdAt: "desc"
            }
        });

    };

    getUnreadNotifications = async (userNumber: string) => {
        return await prisma.notification.findMany({
            where: {
                userNumber,
                isRead: false
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    markAsRead = async (notificationReference: string) => {
        return await prisma.notification.update({
            where: {
                notificationReference
            },
            data: {
                isRead: true
            }
        });

    };

    markAllAsRead = async (userNumber: string) => {
        return await prisma.notification.updateMany({
            where: {
                userNumber,
                isRead: false
            },
            data: {
                isRead: true
            }
        });

    };
}