import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "@prisma/client";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

const transactionController = new TransactionController();

router.post("/deposit", authenticate, authorize(Role.CUSTOMER), asyncHandler(transactionController.deposit));

export default router;