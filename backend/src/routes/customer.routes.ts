import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';


const router = Router();

const customerController = new CustomerController();

//auth routes
router.post('/',authenticate, authorize(Role.CUSTOMER), customerController.createCustomer);
router.get('/',authenticate, authorize(Role.CUSTOMER), customerController.getCustomers);
router.get('/:id',authenticate, authorize(Role.CUSTOMER), customerController.getCustomerById);
router.put('/:id',authenticate, authorize(Role.CUSTOMER), customerController.updateCustomer);
router.delete('/:id',authenticate, authorize(Role.CUSTOMER), customerController.deleteCustomer);

export default router;