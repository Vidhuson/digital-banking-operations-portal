import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';
import { authorize } from '../middleware/role.middleware';

const router = Router();

const authController = new AuthController();

//auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);
router.get('/admin', authenticate, authorize(Role.ADMIN), authController.adminDashboard);

export default router;