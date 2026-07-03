import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';
import { authorize } from '../middleware/role.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

const authController = new AuthController();

//auth routes
router.post('/signup', asyncHandler(authController.signup));
router.post('/login', asyncHandler(authController.login));
router.get('/profile', authenticate, asyncHandler(authController.getProfile));
router.get('/admin', authenticate, authorize(Role.ADMIN), authController.adminDashboard);

export default router;