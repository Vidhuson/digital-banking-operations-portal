import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { AccountController } from '../controllers/account.controller';

const router = Router();

const accountController = new AccountController();

router.post('/',authenticate, authorize(Role.CUSTOMER), accountController.createAccount);

export default router;