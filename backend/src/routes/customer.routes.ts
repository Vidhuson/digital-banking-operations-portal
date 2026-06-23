import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';


const router = Router();

const customerController = new CustomerController();

//auth routes
router.post('/',authenticate, authorize(Role.ADMIN, Role.CUSTOMER), customerController.createCustomer);

export default router;