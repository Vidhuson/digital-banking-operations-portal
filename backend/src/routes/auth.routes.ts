import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

const authController = new AuthController();

//auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);

export default router;