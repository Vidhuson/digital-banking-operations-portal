import { Prisma } from "@prisma/client";
import { CustomerDashboardResponseDto } from "../dtos/dashboard.dto";
import { CustomerRepository } from "../repositories/customer.repository";
import { DashboardRepository } from "../repositories/dashboard.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";

export class DashboardService {
    private customerRepository = new CustomerRepository();
    private dashboardRepository = new DashboardRepository();

    getCustomerDashboard = async (email: string) : Promise<CustomerDashboardResponseDto> => {

        const customer = await this.customerRepository.getCustomerByEmail(email);

        if (!customer) {
            throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");
        }

        const accountSummary = await this.dashboardRepository.getAccountSummary(customer.id);
        const recentTransactions = await this.dashboardRepository.getRecentTransactions(customer.id);

        return {
            customer: {
                customerId: customer.id,
                fullName: customer.fullName
            },
            totalAccounts: accountSummary._count.id,
            totalBalance: accountSummary._sum.balance ?? new Prisma.Decimal(0),
            recentTransactions
        };
    }
}