import { Prisma } from '@prisma/client/scripts/default-index.js';
import { prisma } from '../config/prisma';
import { CreateUserRepositoryDto } from '../dtos/user.dto';
import { UserStatus } from '@prisma/client/wasm';

export class UserRepository {

    findUserByEmail = async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    createUser = async (data: CreateUserRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.user.create({
            data
        });
    }

    updateUserStatus = async (
        id: string,
        status: UserStatus,
        tx?: Prisma.TransactionClient
    ) => {

        const dbClient = tx ?? prisma;

        return dbClient.user.update({
            where: { id },
            data: { status }
        });

    };
}