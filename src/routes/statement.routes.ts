import { Router } from "express";

import { Role } from "@prisma/client";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validation.middleware";

import { asyncHandler } from "../utils/async-handler";

import { StatementController } from "../controllers/statement.controller";
import { getStatementSchema } from "../validations/statement.validation";

const router = Router();

const statementController =
    new StatementController();

router.get(
    "/",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(getStatementSchema),
    asyncHandler(statementController.getStatement)
);

export default router;