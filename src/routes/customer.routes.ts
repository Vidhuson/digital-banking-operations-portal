import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { asyncHandler } from '../utils/async-handler';
import { createCustomerSchema, customerNumberParamSchema, updateCustomerSchema } from '../validations/customer.validation';
import { validate } from '../middleware/validation.middleware';


const router = Router();

const customerController = new CustomerController();

router.post(
    '/', 
    authenticate, 
    authorize(Role.ADMIN, Role.EMPLOYEE),
    validate(createCustomerSchema),
    asyncHandler(customerController.createCustomer)
);

router.get(
    '/', 
    authenticate, 
    authorize(Role.ADMIN, Role.EMPLOYEE),
    asyncHandler(customerController.getCustomers)
);

router.get(
    "/pending",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE),
    asyncHandler(customerController.getPendingCustomers)
);

router.get(
    '/:customerNumber', 
    authenticate, 
    authorize(Role.ADMIN, Role.EMPLOYEE), 
    validate(customerNumberParamSchema),
    asyncHandler(customerController.getCustomerByCustomerNumber)
);

router.put(
    '/:customerNumber', 
    authenticate, 
    authorize(Role.ADMIN, Role.EMPLOYEE), 
    validate(updateCustomerSchema),
    asyncHandler(customerController.updateCustomer)
);

router.delete(
    '/:customerNumber', 
    authenticate, 
    authorize(Role.ADMIN, Role.EMPLOYEE), 
    validate(customerNumberParamSchema),
    asyncHandler(customerController.deleteCustomer)
);

router.patch(
    "/:customerNumber/approve",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE),
    validate(customerNumberParamSchema),
    asyncHandler(customerController.approveCustomer)
);

router.patch(
    "/:customerNumber/reject",
    authenticate,
    authorize(Role.ADMIN, Role.EMPLOYEE),
    validate(customerNumberParamSchema),
    asyncHandler(customerController.rejectCustomer)
);

export default router;