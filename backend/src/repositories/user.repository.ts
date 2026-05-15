import { prisma } from '../config/prisma';

export class UserRepository {
    
    findUserByEmail = async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    createUser = async (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        return prisma.user.create({ 
            data 
        });
    }
}

