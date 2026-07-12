import { Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { AuthRequest } from "../types/auth-request";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export class DashboardController {
    private dashboardService = new DashboardService();

    getCustomerDashboard = async (req: AuthRequest, res: Response) => {
        const email = req.user?.email as string;
        const dashboardData = await this.dashboardService.getCustomerDashboard(email);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Customer dashboard retrieved successfully.",
            dashboardData
        )
    }
}