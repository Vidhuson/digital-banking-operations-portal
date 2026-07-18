import { CreateNotificationDto } from "../dtos/notification.dto";
import { NotificationRepository } from "../repositories/notification.repository";
import { Prisma } from "@prisma/client";
import { ReferenceGenerator } from "../utils/reference-generator";

export class NotificationService {

    private notificationRepository = new NotificationRepository();

    createNotification = async (
        data: Omit<CreateNotificationDto, "notificationReference">,
        tx?: Prisma.TransactionClient
    ) => {

        return await this.notificationRepository.createNotification(
            {
                notificationReference: ReferenceGenerator.generateNotificationReference(),
                ...data
            },
            tx
        );
    };

    getNotifications = async (userNumber: string) => {

        return await this.notificationRepository.getNotifications(
            userNumber
        );

    };

    markAsRead = async (notificationReference: string) => {

        return await this.notificationRepository.markAsRead(
            notificationReference
        );

    };

    markAllAsRead = async (userNumber: string) => {

        return await this.notificationRepository.markAllAsRead(
            userNumber
        );

    };

}