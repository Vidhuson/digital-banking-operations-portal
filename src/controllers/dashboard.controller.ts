import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { AuthRequest } from "../types/auth-request";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export class DashboardController {
    private readonly dashboardService = new DashboardService();

    getCustomerDashboard = async (_req: Request, res: Response) => {
        const dashboardData = await this.dashboardService.getCustomerDashboard();
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Customer dashboard retrieved successfully.",
            dashboardData
        )
    }
}