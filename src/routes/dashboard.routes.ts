import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "@prisma/client";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

const dashboardController = new DashboardController();

router.get(
    "/customer",
    authenticate,
    authorize(Role.CUSTOMER),
    asyncHandler(dashboardController.getCustomerDashboard)
);

export default router;