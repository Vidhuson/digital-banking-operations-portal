import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export class EmployeeController {
    private employeeService = new EmployeeService();

    getEmployeeDashboard = async (_req: Request, res: Response) => {
        const dashboard = await this.employeeService.getEmployeeDashboard();

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Employee dashboard fetched successfully.",
            dashboard
        );
    };
}