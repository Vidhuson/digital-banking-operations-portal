import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { HttpStatus } from '../utils/http-status';
import { ReferenceGenerator } from '../utils/reference-generator';
import { ChangePasswordDto, LoginDto, SignupDto } from '../dtos/user.dto';
import { AuditLogService } from './audit-log.service';
import { AuditAction, AuditModule, AuditStatus, CustomerStatus, NotificationType, UserStatus } from '@prisma/client';
import { prisma } from '../config/prisma';
import { NotificationService } from './notification.service';
import { CustomerRepository } from '../repositories/customer.repository';
import { PasswordUtil } from '../utils/password-utils';

export class AuthService {

    private userRepository = new UserRepository();
    private auditLogService = new AuditLogService();
    private notificationService = new NotificationService();
    private customerRepository = new CustomerRepository();

    signup = async (data: SignupDto) => {
        const user = await this.userRepository.findUserByEmail(data.email);

        if (user) {
            switch (user.status) {

                case UserStatus.PENDING_APPROVAL:
                    throw new ApiError(
                        HttpStatus.CONFLICT,
                        "Your registration is already pending approval."
                    );

                case UserStatus.ACTIVE:
                    throw new ApiError(
                        HttpStatus.CONFLICT,
                        "User already exists."
                    );

                case UserStatus.INACTIVE:
                    throw new ApiError(
                        HttpStatus.CONFLICT,
                        "Your account is inactive. Please contact the bank."
                    );
            }
        }

        const hashedPassword = await PasswordUtil.hash(data.password);

        const response = await prisma.$transaction(async (tx) => {

            const user = await this.userRepository.createUser({
                userNumber: ReferenceGenerator.generateUserNumber(),
                name: data.name,
                email: data.email,
                password: hashedPassword,
                status: UserStatus.PENDING_APPROVAL,
                isFirstLogin: true
            }, tx);

            const customer = await this.customerRepository.createCustomer(
                {
                    customerNumber: ReferenceGenerator.generateCustomerNumber(),
                    userId: user.id,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
                    status: CustomerStatus.PENDING_APPROVAL
                },
                tx
            );

            await this.notificationService.createNotification(
                {
                    userNumber: user.userNumber,
                    title: "Registration Submitted",
                    message: `Dear ${user.name}, your registration has been submitted successfully and is awaiting approval.`,
                    type: NotificationType.USER
                },
                tx
            );

            await this.auditLogService.log({
                userNumber: user.userNumber,
                userRole: user.role,
                module: AuditModule.AUTH,
                action: AuditAction.SIGNUP,
                entityReference: user.userNumber,
                status: AuditStatus.SUCCESS,
                description: "Online customer registration submitted successfully.",
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
    };

    login = async (data: LoginDto) => {

        const user = await this.userRepository.findUserByEmail(data.email);

        if (!user) {
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Invalid Credentials"
            );
        }

        switch (user.status) {

            case UserStatus.PENDING_APPROVAL:
                throw new ApiError(
                    HttpStatus.FORBIDDEN,
                    "Your registration is still pending approval."
                );

            case UserStatus.INACTIVE:
                throw new ApiError(
                    HttpStatus.FORBIDDEN,
                    "Your account is inactive. Please contact the bank."
                );
        }

        const isPasswordValid = await PasswordUtil.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Invalid Credentials"
            );
        }

        const jwtPayload = {
            userId: user.id,
            userNumber: user.userNumber,
            email: user.email,
            role: user.role
        };

        const jwtToken = jwt.sign(
            jwtPayload,
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        await this.auditLogService.log({
            userNumber: user.userNumber,
            userRole: user.role,
            module: AuditModule.AUTH,
            action: AuditAction.LOGIN,
            entityReference: user.userNumber,
            status: AuditStatus.SUCCESS,
            description: "User logged in successfully."
        });

        return {
            jwtToken,
            user: {
                id: user.id,
                userNumber: user.userNumber,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                isFirstLogin: user.isFirstLogin
            }
        };
    };

    changePassword = async (userId: string, data: ChangePasswordDto) => {

        const user = await this.userRepository.findUserById(userId);

        if (!user) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "User not found."
            );
        }

        const isCurrentPasswordValid = await PasswordUtil.compare(data.currentPassword, user.password);

        if (!isCurrentPasswordValid) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                "Current password is incorrect."
            );

        }

        if (!user.isFirstLogin) {

            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                "Password has already been changed."
            );

        }

        const hashedPassword = await PasswordUtil.hash(data.newPassword);

        await prisma.$transaction(async (tx) => {

            await this.userRepository.updatePassword(
                user.id,
                hashedPassword,
                tx
            );

            await this.notificationService.createNotification({
                userNumber: user.userNumber,
                title: "Password Updated",
                message: "Your password has been changed successfully.",
                type: NotificationType.USER
            }, tx);

            await this.auditLogService.log({
                userNumber: user.userNumber,
                userRole: user.role,
                module: AuditModule.AUTH,
                action: AuditAction.CHANGEPASSWORD,
                entityReference: user.userNumber,
                status: AuditStatus.SUCCESS,
                description: "First login password changed.",
                tx
            });
        });
    };
}