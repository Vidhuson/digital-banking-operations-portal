import { prisma } from '../config/prisma';
import { CreateUserRepositoryDto } from '../dtos/user.dto';

export class UserRepository {
    
    findUserByEmail = async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    createUser = async (data: CreateUserRepositoryDto) => {
        return prisma.user.create({ 
            data 
        });
    }
}

