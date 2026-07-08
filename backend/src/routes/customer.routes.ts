import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { asyncHandler } from '../utils/async-handler';


const router = Router();

const customerController = new CustomerController();

router.post('/', authenticate, authorize(Role.CUSTOMER), asyncHandler(customerController.createCustomer));
router.get('/', authenticate, authorize(Role.CUSTOMER), asyncHandler(customerController.getCustomers));
router.get('/:id', authenticate, authorize(Role.CUSTOMER), asyncHandler(customerController.getCustomerById));
router.put('/:id', authenticate, authorize(Role.CUSTOMER), asyncHandler(customerController.updateCustomer));
router.delete('/:id', authenticate, authorize(Role.CUSTOMER), asyncHandler(customerController.deleteCustomer));

export default router;