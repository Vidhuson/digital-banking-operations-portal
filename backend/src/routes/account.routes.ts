import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { validate } from '../middleware/validation.middleware';
import { AccountController } from '../controllers/account.controller';
import { asyncHandler } from '../utils/async-handler';
import { createAccountSchema, updateAccountSchema, accountIdParamSchema, accountNumberParamSchema } from '../validations/account.validation';

const router = Router();

const accountController = new AccountController();

router.post('/', authenticate, authorize(Role.CUSTOMER), validate(createAccountSchema), asyncHandler(accountController.createAccount));
router.get('/', authenticate, authorize(Role.CUSTOMER), asyncHandler(accountController.getAccounts));
router.get("/:id", authenticate, authorize(Role.CUSTOMER), validate(accountIdParamSchema), asyncHandler(accountController.getAccountById));
router.put("/:id", authenticate, authorize(Role.CUSTOMER), validate(accountIdParamSchema), validate(updateAccountSchema), asyncHandler(accountController.updateAccount));
router.delete("/:id", authenticate, authorize(Role.CUSTOMER), validate(accountIdParamSchema), asyncHandler(accountController.deleteAccount));
router.get("/account-number/:accountNumber", authenticate, authorize(Role.CUSTOMER), validate(accountNumberParamSchema), asyncHandler(accountController.getAccountByAccountNumber));

export default router;