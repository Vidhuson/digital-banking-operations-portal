import { Router } from "express";
import { Role } from "@prisma/client";
import { AuditLogController } from "../controllers/audit-log.controller";
import { authorize } from "../middleware/role.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const auditLogController = new AuditLogController();

router.get(
    "/",
    authenticate,
    authorize(Role.ADMIN),
    auditLogController.searchAuditLogs
);

export default router;