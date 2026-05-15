import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

const authController = new AuthController();

//auth routes
router.post('/signup', authController.signup);

export default router;