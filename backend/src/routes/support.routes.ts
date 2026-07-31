import { Router } from "express";

import { Role } from "@prisma/client";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validation.middleware";

import { asyncHandler } from "../utils/async-handler";

import { SupportController } from "../controllers/support.controller";
import { createSupportSchema, getSupportTicketSchema } from "../validations/support.validation";

const router = Router();

const supportController = new SupportController();

router.post(
    "/",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(createSupportSchema),
    asyncHandler(supportController.createTicket)
);

router.get(
    "/",
    authenticate,
    authorize(Role.CUSTOMER),
    asyncHandler(supportController.getMyTickets)
);

router.get(
    "/:ticketNumber",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(getSupportTicketSchema),
    asyncHandler(supportController.getTicketByTicketNumber)
);

export default router;