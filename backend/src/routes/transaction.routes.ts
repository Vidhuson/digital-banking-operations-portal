import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validation.middleware";
import { Role } from "@prisma/client";
import { asyncHandler } from "../utils/async-handler";
import { depositSchema, withdrawSchema, fundTransferSchema, searchTransactionSchema } from "../validations/transaction.validation";

const router = Router();

const transactionController = new TransactionController();

router.post(
    "/deposit",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(depositSchema),
    asyncHandler(transactionController.deposit)
);

router.post(
    "/withdraw",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(withdrawSchema),
    asyncHandler(transactionController.withdraw)
);

router.post(
    "/fund-transfer",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(fundTransferSchema),
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
    validate(searchTransactionSchema),
    transactionController.searchTransactions
);


export default router;