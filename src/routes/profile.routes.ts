import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { validate } from '../middleware/validation.middleware';
import { asyncHandler } from '../utils/async-handler';
import { ProfileController } from '../controllers/profile.controller';
import { updateProfileSchema } from '../validations/profile.validation';


const router = Router();

const profileController = new ProfileController();

router.get(
    "/",
    authenticate,
    authorize(Role.CUSTOMER),
    asyncHandler(profileController.getMyProfile)
);

router.put(
    "/",
    authenticate,
    authorize(Role.CUSTOMER),
    validate(updateProfileSchema),
    asyncHandler(profileController.updateMyProfile)
);

export default router;