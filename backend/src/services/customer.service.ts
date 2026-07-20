import { CustomerRepository } from "../repositories/customer.repository";
import { BranchCreateCustomerDto, CreateCustomerDto } from '../dtos/customer.dto';
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { ReferenceGenerator } from "../utils/reference-generator";
import { AuditLogService } from "./audit-log.service";
import { AuditAction, AuditModule, AuditStatus, CustomerStatus, NotificationType, UserStatus } from "@prisma/client";
import { RequestContext } from "../context/request-context";
import { prisma } from "../config/prisma";
import { NotificationService } from "./notification.service";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import { PasswordGenerator } from "../utils/password-generator";

export class CustomerService {
    private customerRepository = new CustomerRepository();
    private auditLogService = new AuditLogService();
    private notificationService = new NotificationService();
    private userRepository = new UserRepository();

    private getCurrentUser = () => {
        const currentUser = RequestContext.getCurrentUser();
        if (!currentUser)
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Current user not found."
            );
        return currentUser;
    }

    createCustomer = async (data: BranchCreateCustomerDto) => {

        const currentUser = this.getCurrentUser();

        const existingUser = await this.userRepository.findUserByEmail(data.email);

        if (existingUser) {
            throw new ApiError(
                HttpStatus.CONFLICT,
                "User already exists."
            );

        }

        const temporaryPassword = data.temporaryPassword ?? PasswordGenerator.generate();

        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

        const response = await prisma.$transaction(async (tx) => {

            const user = await this.userRepository.createUser({
                userNumber: ReferenceGenerator.generateUserNumber(),
                name: data.name,
                email: data.email,
                password: hashedPassword,
                status: UserStatus.ACTIVE,
                isFirstLogin: true
            }, tx);

            const customer = await this.customerRepository.createCustomer(
                {
                    customerNumber: ReferenceGenerator.generateCustomerNumber(),
                    userId: user.id,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
                    status: CustomerStatus.ACTIVE
                },
                tx
            );

            await this.notificationService.createNotification(
                {
                    userNumber: user.userNumber,
                    title: "Registration Submitted",
                    message: `Welcome ${user.name}. Your account has been created successfully.`,
                    type: NotificationType.USER
                },
                tx
            );

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.AUTH,
                action: AuditAction.SIGNUP,
                entityReference: user.userNumber,
                status: AuditStatus.SUCCESS,
                description: "Branch assisted customer onboarding.",
                tx
            });

            return {
                id: user.id,
                userNumber: user.userNumber,
                customerNumber: customer.customerNumber,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                isFirstLogin: user.isFirstLogin
            };
        });

        return response;
    }

    getCustomers = async () => {
        return this.customerRepository.getCustomers();
    }

    getCustomerByCustomerNumber = async (customerNumber: string) => {
        const customer = await this.customerRepository.getCustomerByCustomerNumber(customerNumber);
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Customer not found');
        return customer;
    }

    getPendingCustomers = async () => {
        return this.customerRepository.getPendingCustomers();
    }

    approveCustomer = async (customerNumber: string) => {

        const currentUser = this.getCurrentUser();

        const customer = await this.customerRepository.getCustomerByCustomerNumber(customerNumber);

        if (!customer) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );
        }

        if (customer.status !== CustomerStatus.PENDING_APPROVAL) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                "Customer is not pending approval."
            );
        }

        const response = await prisma.$transaction(async (tx) => {

            await this.customerRepository.updateCustomerStatus(
                customer.id,
                CustomerStatus.ACTIVE,
                tx
            );

            await this.userRepository.updateUserStatus(
                customer.userId,
                UserStatus.ACTIVE,
                tx
            );

            await this.notificationService.createNotification(
                {
                    userNumber: customer.user.userNumber,
                    title: "Registration Approved",
                    message: `Congratulations! Your customer registration (${customer.customerNumber}) has been approved. You can now log in to your account.`,
                    type: NotificationType.USER
                },
                tx
            );

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.CUSTOMER,
                action: AuditAction.APPROVE_CUSTOMER,
                entityReference: customer.customerNumber,
                status: AuditStatus.SUCCESS,
                description: `Customer ${customer.customerNumber} registration approved.`,
                tx
            });

            return {
                customerNumber: customer.customerNumber,
                status: CustomerStatus.ACTIVE
            };
        });

        return response;

    };

    rejectCustomer = async (customerNumber: string) => {

        const currentUser = this.getCurrentUser();

        const customer =
            await this.customerRepository.getCustomerByCustomerNumber(customerNumber);

        if (!customer) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );
        }

        if (customer.status !== CustomerStatus.PENDING_APPROVAL) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                "Customer is not pending approval."
            );
        }

        const response = await prisma.$transaction(async (tx) => {

            await this.customerRepository.updateCustomerStatus(
                customer.id,
                CustomerStatus.INACTIVE,
                tx
            );

            await this.userRepository.updateUserStatus(
                customer.userId,
                UserStatus.INACTIVE,
                tx
            );

            await this.notificationService.createNotification(
                {
                    userNumber: customer.user.userNumber,
                    title: "Registration Rejected",
                    message: `Your customer registration request (${customer.customerNumber}) has been rejected. Please visit your nearest branch or contact customer support for more information.`,
                    type: NotificationType.USER
                },
                tx
            );

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.CUSTOMER,
                action: AuditAction.REJECT_CUSTOMER,
                entityReference: customer.customerNumber,
                status: AuditStatus.SUCCESS,
                description: `Customer ${customer.customerNumber} registration rejected.`,
                tx
            });

            return {
                customerNumber: customer.customerNumber,
                status: CustomerStatus.INACTIVE
            };

        });

        return response;

    };

    updateCustomer = async (customerNumber: string, customerData: Partial<CreateCustomerDto>) => {
        const currentUser = this.getCurrentUser();

        const response = await prisma.$transaction(async (tx) => {

            const customer = await this.customerRepository.updateCustomer(customerNumber, customerData, tx);

            await this.notificationService.createNotification({
                userNumber: currentUser.userNumber,
                title: "Customer Updated",
                message: `Customer ${customer.customerNumber} has been updated successfully.`,
                type: NotificationType.CUSTOMER
            }, tx);

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

    deleteCustomer = async (customerNumber: string) => {
        const currentUser = this.getCurrentUser();

        const response = await prisma.$transaction(async (tx) => {

            const customer = await this.customerRepository.deleteCustomer(customerNumber, tx);

            await this.notificationService.createNotification({
                userNumber: currentUser.userNumber,
                title: "Customer Deleted",
                message: `Customer ${customer.customerNumber} has been deleted successfully.`,
                type: NotificationType.CUSTOMER
            }, tx);

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