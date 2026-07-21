import { Prisma } from '@prisma/client/scripts/default-index.js';
import { prisma } from '../config/prisma';
import { CreateUserRepositoryDto } from '../dtos/user.dto';
import { UserStatus } from '@prisma/client/wasm';

export class UserRepository {

    createUser = async (data: CreateUserRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.user.create({
            data
        });
    }

    findUserByEmail = async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    findUserById = async (id: string) => {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    updateUserStatus = async (id: string, status: UserStatus, tx?: Prisma.TransactionClient) => {

        const dbClient = tx ?? prisma;

        return dbClient.user.update({
            where: { id },
            data: { status }
        });

    };

    updatePassword = async (id: string, password: string, tx?: Prisma.TransactionClient) => {

        const dbClient = tx ?? prisma;

        return dbClient.user.update({
            where: { id },
            data: {
                password,
                isFirstLogin: false
            }
        });
    };
}