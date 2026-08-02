import { NotificationType } from "@prisma/client";

export interface CreateNotificationDto {
    notificationReference: string;
    userNumber: string;
    title: string;
    message: string;
    type: NotificationType;
}