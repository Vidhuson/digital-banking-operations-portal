import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerDto } from '../dtos/customer.dto';
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { ReferenceGenerator } from "../utils/reference-generator";
import { AuditLogService } from "./audit-log.service";
import { AuditAction, AuditModule, AuditStatus } from "@prisma/client";
import { RequestContext } from "../context/request-context";

export class CustomerService {

    private customerRepository = new CustomerRepository();
    private auditLogService = new AuditLogService();

    createCustomer = async (customerData: CreateCustomerDto) => {

        const currentUser = RequestContext.getCurrentUser();

        if (!currentUser) throw new ApiError(HttpStatus.UNAUTHORIZED, "Current user not found.");

        const customer = await this.customerRepository.getCustomerByEmail(customerData.email);

        if (customer) throw new ApiError(HttpStatus.CONFLICT, 'Customer already exists');

        const customerNumber = ReferenceGenerator.generateCustomerNumber();
        const customerToCreate = {
            ...customerData,
            customerNumber
        };

        const createdCustomer = await this.customerRepository.createCustomer(customerToCreate);

        await this.auditLogService.log({
            userNumber: currentUser.userNumber,
            userRole: currentUser.role,
            module: AuditModule.CUSTOMER,
            action: AuditAction.CREATE_CUSTOMER,
            entityReference: createdCustomer.customerNumber,
            status: AuditStatus.SUCCESS,
            description: "Customer created successfully."
        });

        return createdCustomer;
    }

    getCustomers = async () => {
        return this.customerRepository.getCustomers();
    }

    getCustomerById = async (id: string) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Customer not found');
        return customer;
    }

    updateCustomer = async (id: string, customerData: Partial<CreateCustomerDto>) => {
        const currentUser = RequestContext.getCurrentUser();
        if (!currentUser) throw new ApiError(HttpStatus.UNAUTHORIZED, "Current user not found.");
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");
        await this.auditLogService.log({
            userNumber: currentUser.userNumber,
            userRole: currentUser.role,
            module: AuditModule.CUSTOMER,
            action: AuditAction.UPDATE_CUSTOMER,
            entityReference: customer.customerNumber,
            status: AuditStatus.SUCCESS,
            description: "Customer updated successfully."
        });
        return this.customerRepository.updateCustomer(id, customerData);
    };

    deleteCustomer = async (id: string) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");
        return this.customerRepository.deleteCustomer(id);
    }
}