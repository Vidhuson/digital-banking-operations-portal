import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "@prisma/client";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

const transactionController = new TransactionController();

router.post(
    "/deposit",
    authenticate,
    authorize(Role.CUSTOMER),
    asyncHandler(transactionController.deposit)
);

router.post(
    "/withdraw",
    authenticate,
    authorize(Role.CUSTOMER),
    asyncHandler(transactionController.withdraw)
);

router.post(
    "/fund-transfer",
    authenticate,
    authorize(Role.CUSTOMER),
    asyncHandler(transactionController.fundTransfer)
);

router.get(
    "/",
    authenticate,
    authorize(
        Role.ADMIN,
        Role.EMPLOYEE,
        Role.CUSTOMER
    ),
    transactionController.searchTransactions
);


export default router;