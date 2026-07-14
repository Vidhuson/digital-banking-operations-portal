import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerDto } from '../dtos/customer.dto';
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { ReferenceGenerator } from "../utils/reference-generator";
import { AuditLogService } from "./audit-log.service";
import { AuditAction, AuditModule, AuditStatus } from "@prisma/client";
import { RequestContext } from "../context/request-context";
import { prisma } from "../config/prisma";

export class CustomerService {

    private customerRepository = new CustomerRepository();
    private auditLogService = new AuditLogService();

    private getCurrentUser = () => {
        const currentUser = RequestContext.getCurrentUser();
        if (!currentUser)
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Current user not found."
            );
        return currentUser;
    }

    createCustomer = async (customerData: CreateCustomerDto) => {

        const currentUser = this.getCurrentUser();

        const existingCustomer = await this.customerRepository.getCustomerByEmail(customerData.email);

        if (existingCustomer) throw new ApiError(HttpStatus.CONFLICT, 'Customer already exists');

        const customerNumber = ReferenceGenerator.generateCustomerNumber();

        const createCustomerData: CreateCustomerDto = {
            ...customerData,
            customerNumber: ReferenceGenerator.generateCustomerNumber()
        };

        const response = await prisma.$transaction(async (tx) => {

            const customer = await this.customerRepository.createCustomer(
                createCustomerData,
                tx
            );

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.CUSTOMER,
                action: AuditAction.CREATE_CUSTOMER,
                entityReference: customer.customerNumber,
                status: AuditStatus.SUCCESS,
                description: `Customer ${customer.customerNumber} created successfully.`,
                tx
            });

            return customer;
        });

        return response;

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
        const currentUser = this.getCurrentUser();

        const existingCustomer = await this.customerRepository.getCustomerById(id);

        if (!existingCustomer) throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");

        const response = await prisma.$transaction(async (tx) => {

            const customer = await this.customerRepository.updateCustomer(id, customerData, tx);

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.CUSTOMER,
                action: AuditAction.UPDATE_CUSTOMER,
                entityReference: customer.customerNumber,
                status: AuditStatus.SUCCESS,
                description: `Customer ${customer.customerNumber} updated successfully.`,
                tx
            });

            return customer;
        });

        return response;
    }

    deleteCustomer = async (id: string) => {
        const currentUser = this.getCurrentUser();

        const existingCustomer = await this.customerRepository.getCustomerById(id);

        if (!existingCustomer) throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");

        const response = await prisma.$transaction(async (tx) => {

            const customer = await this.customerRepository.deleteCustomer(id, tx);

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.CUSTOMER,
                action: AuditAction.DELETE_CUSTOMER,
                entityReference: customer.customerNumber,
                status: AuditStatus.SUCCESS,
                description: `Customer ${customer.customerNumber} deleted successfully.`,
                tx
            });

            return customer;
        });
        return response;
    }
}