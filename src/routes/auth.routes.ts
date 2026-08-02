import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { Role } from '@prisma/client';
import { authorize } from '../middleware/role.middleware';
import { asyncHandler } from '../utils/async-handler';
import { changePasswordSchema, loginSchema, signUpSchema } from '../validations/auth.validation';
import { validate } from '../middleware/validation.middleware';

const router = Router();

const authController = new AuthController();

//auth routes
router.post('/signup', validate(signUpSchema), asyncHandler(authController.signup));
router.post('/login', validate(loginSchema), asyncHandler(authController.login));

router.post(
    "/change-password",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER),
    validate(changePasswordSchema),
    asyncHandler(authController.changePassword)
);

router.get('/profile', authenticate, asyncHandler(authController.getProfile));
router.get('/admin', authenticate, authorize(Role.ADMIN), authController.adminDashboard);

export default router;