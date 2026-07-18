import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { Role } from "@prisma/client";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

const notificationController = new NotificationController();

router.get(
    "/",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    asyncHandler(notificationController.getNotifications)
);

router.patch(
    "/:notificationReference/read",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    asyncHandler(notificationController.markAsRead)
);

router.patch(
    "/read-all",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    asyncHandler(notificationController.markAllAsRead)
);

export default router;