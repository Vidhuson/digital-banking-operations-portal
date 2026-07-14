import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/api-error';
import { HttpStatus } from '../utils/http-status';
import { ReferenceGenerator } from '../utils/reference-generator';
import { SignupDto } from '../dtos/user.dto';
import { AuditLogService } from './audit-log.service';
import { AuditAction, AuditModule, AuditStatus } from '@prisma/client';
import { prisma } from '../config/prisma';

export class AuthService {

    private userRepository = new UserRepository();
    private auditLogService = new AuditLogService();

    signup = async (data: SignupDto) => {
        const existingUser =
            await this.userRepository.findUserByEmail(data.email);

        if (existingUser) throw new ApiError(HttpStatus.CONFLICT, 'User already exists');

        const hashedPassword =
            await bcrypt.hash(data.password, 10);

        const response = await prisma.$transaction(async (tx) => {

            const user = await this.userRepository.createUser({
                userNumber: ReferenceGenerator.generateUserNumber(),
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }, tx);

            await this.auditLogService.log({
                userNumber: user.userNumber,
                userRole: user.role,
                module: AuditModule.AUTH,
                action: AuditAction.SIGNUP,
                entityReference: user.userNumber,
                status: AuditStatus.SUCCESS,
                description: `User ${user.name} registered successfully.`,
                tx
            });

            return user;
        });

        return response;
    };

    login = async (reqData: {
        email: string;
        password: string
    }) => {

        const user = await this.userRepository.findUserByEmail(reqData.email);

        if (!user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid Credentials');

        const isPasswordValid = await bcrypt.compare(reqData.password, user.password);

        if (!isPasswordValid) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid Credentials');

        const jwtPayload = {
            userId: user.id,
            userNumber: user.userNumber,
            email: user.email,
            role: user.role
        }

        // Generate JWT token
        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        await this.auditLogService.log({
            userNumber: user.userNumber,
            userRole: user.role,
            module: AuditModule.AUTH,
            action: AuditAction.LOGIN,
            entityReference: user.userNumber,
            status: AuditStatus.SUCCESS,
            description: "User logged in successfully."
        });

        const response = {
            jwtToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
        return response;
    }
}