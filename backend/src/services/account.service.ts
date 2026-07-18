import { AccountRepository } from "../repositories/account.repository"
import { CustomerRepository } from "../repositories/customer.repository";
import { CreateAccountDto, UpdateAccountDto } from "../dtos/account.dto";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { ReferenceGenerator } from "../utils/reference-generator";
import { AuditLogService } from "./audit-log.service";
import { RequestContext } from "../context/request-context";
import { AuditAction, AuditModule, AuditStatus, NotificationType } from "@prisma/client";
import { prisma } from "../config/prisma";
import { NotificationService } from "./notification.service";

export class AccountService {
    private accountRepository = new AccountRepository();
    private customerRepository = new CustomerRepository();
    private auditLogService = new AuditLogService();
    private notificationService = new NotificationService();

    private getCurrentUser = () => {
        const currentUser = RequestContext.getCurrentUser();
        if (!currentUser)
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Current user not found."
            );
        return currentUser;
    }

    createAccount = async (accountData: CreateAccountDto) => {

        const currentUser = this.getCurrentUser();

        const customer = await this.customerRepository.getCustomerById(accountData.customerId);

        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Customer not found');

        const response = await prisma.$transaction(async (tx) => {

            const account = await this.accountRepository.createAccount({
                accountNumber: ReferenceGenerator.generateAccountNumber(),
                customerId: accountData.customerId,
                branchName: "Chennai Main Branch",
                ifscCode: "CHEN0001001",
                accountType: accountData.accountType
            }, tx);

            await this.notificationService.createNotification({
                userNumber: currentUser.userNumber,
                title: "Account Created",
                message: `Account ${account.accountNumber} has been created successfully.`,
                type: NotificationType.ACCOUNT
            }, tx);

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.ACCOUNT,
                action: AuditAction.CREATE_ACCOUNT,
                entityReference: account.accountNumber,
                status: AuditStatus.SUCCESS,
                description: `Account ${account.accountNumber} created successfully.`,
                tx
            });

            return account;
        });

        return response;
    }

    getAccounts = async () => {
        return this.accountRepository.getAccounts();
    }

    getAccountById = async (id: string) => {
        const account = await this.accountRepository.getAccountById(id);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");
        return account;
    }

    getAccountByAccountNumber = async (accountNumber: string) => {
        const account = await this.accountRepository.getAccountByAccountNumber(accountNumber);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");
        return account;
    }

    updateAccount = async (id: string, updateAccData: UpdateAccountDto) => {
        const currentUser = this.getCurrentUser();
        const account = await this.accountRepository.getAccountById(id);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");

        const response = await prisma.$transaction(async (tx) => {
            const account = await this.accountRepository.updateAccount(id, updateAccData, tx);

            await this.notificationService.createNotification({
                userNumber: currentUser.userNumber,
                title: "Account Updated",
                message: `Account ${account.accountNumber} has been updated successfully.`,
                type: NotificationType.ACCOUNT
            }, tx);

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.ACCOUNT,
                action: AuditAction.UPDATE_ACCOUNT,
                entityReference: account.accountNumber,
                status: AuditStatus.SUCCESS,
                description: `Account ${account.accountNumber} updated successfully.`,
                tx
            });

            return account;
        });
        
        return response;
    }

    deleteAccount = async (id: string) => {
        const currentUser = this.getCurrentUser();
        const account = await this.accountRepository.getAccountById(id);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");

        const response = await prisma.$transaction(async (tx) => {

            const account = await this.accountRepository.deleteAccount(id, tx);

            await this.notificationService.createNotification({
                userNumber: currentUser.userNumber,
                title: "Account Deleted",
                message: `Account ${account.accountNumber} has been deleted successfully.`,
                type: NotificationType.ACCOUNT
            }, tx);

            await this.auditLogService.log({
                userNumber: currentUser.userNumber,
                userRole: currentUser.role,
                module: AuditModule.ACCOUNT,
                action: AuditAction.DELETE_ACCOUNT,
                entityReference: account.accountNumber,
                status: AuditStatus.SUCCESS,
                description: `Account ${account.accountNumber} deleted successfully.`,
                tx
            });
            return account;
        });

        return response;
    }
}