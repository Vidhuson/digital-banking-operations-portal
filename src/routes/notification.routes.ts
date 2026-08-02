import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { Role } from "@prisma/client";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validation.middleware";
import { asyncHandler } from "../utils/async-handler";
import { notificationReferenceParamSchema } from "../validations/notification.validation";

const router = Router();

const notificationController = new NotificationController();

router.get(
    "/",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    asyncHandler(notificationController.getNotifications)
);

router.get(
    "/unread",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    asyncHandler(notificationController.getUnreadNotifications)
);

router.patch(
    "/read-all",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    asyncHandler(notificationController.markAllAsRead)
);

router.patch(
    "/:notificationReference/read",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    validate(notificationReferenceParamSchema),
    asyncHandler(notificationController.markAsRead)
);

export default router;