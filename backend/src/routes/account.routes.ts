import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { AccountController } from '../controllers/account.controller';

const router = Router();

const accountController = new AccountController();

router.post('/', authenticate, authorize(Role.CUSTOMER), accountController.createAccount);
router.get('/', authenticate, authorize(Role.CUSTOMER), accountController.getAccounts);
router.get("/:id", authenticate, authorize(Role.CUSTOMER), accountController.getAccountById);
router.put("/:id", authenticate, authorize(Role.CUSTOMER), accountController.updateAccount);
router.delete("/:id", authenticate, authorize(Role.CUSTOMER), accountController.deleteAccount);

export default router;