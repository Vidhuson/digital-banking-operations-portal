import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "@prisma/client";
import { asyncHandler } from "../utils/async-handler";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();

const employeeController = new EmployeeController();

router.get(
     "/dashboard",
    authenticate,
    authorize(Role.EMPLOYEE),
    asyncHandler(employeeController.getEmployeeDashboard)
);


export default router;