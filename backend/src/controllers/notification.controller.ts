import { Response } from "express";
import { NotificationService } from "../services/notification.service";
import { AuthRequest } from "../types/auth-request";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export class NotificationController {

    private notificationService = new NotificationService();

    getNotifications = async (req: AuthRequest, res: Response) => {

        const userNumber = req.user!.userNumber;

        const notifications = await this.notificationService.getNotifications(userNumber);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Notifications fetched successfully.",
            notifications
        );

    };

    getUnreadNotifications = async (req: AuthRequest, res: Response) => {

        const userNumber = req.user!.userNumber;

        const notifications = await this.notificationService.getUnreadNotifications(userNumber);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Unread notifications retrieved successfully.",
            notifications
        );
    };

    markAsRead = async (req: AuthRequest, res: Response) => {

        const notificationReference = req.params.notificationReference as string;

        await this.notificationService.markAsRead(notificationReference);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Notification marked as read.",
            null
        );

    };

    markAllAsRead = async (req: AuthRequest, res: Response) => {

        const userNumber = req.user!.userNumber;

        await this.notificationService.markAllAsRead(userNumber);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "All notifications marked as read.",
            null
        );
    };
}