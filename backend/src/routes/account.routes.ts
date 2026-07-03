import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { AccountController } from '../controllers/account.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

const accountController = new AccountController();

router.post('/', authenticate, authorize(Role.CUSTOMER), asyncHandler(accountController.createAccount));
router.get('/', authenticate, authorize(Role.CUSTOMER), asyncHandler(accountController.getAccounts));
router.get("/:id", authenticate, authorize(Role.CUSTOMER), asyncHandler(accountController.getAccountById));
router.put("/:id", authenticate, authorize(Role.CUSTOMER), asyncHandler(accountController.updateAccount));
router.delete("/:id", authenticate, authorize(Role.CUSTOMER), asyncHandler(accountController.deleteAccount));

export default router;